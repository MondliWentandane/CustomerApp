/**
 * Database Seeding Script for Rooms
 * 
 * This script populates your Supabase database with the room data from the frontend.
 * Matches your actual database schema with rooms, hotels, and roomphotos tables.
 * 
 * Usage:
 * 1. Install dependencies: npm install @supabase/supabase-js dotenv
 * 2. Set up your .env file with Supabase credentials
 * 3. Run: node database/seed-rooms.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://gpwhxweltklvriossdmv.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const roomsData = [
  {
    room_type: 'Superior Room',
    price_per_night: 1000,
    photos: ['/SUPERIOR.png', '/SUP3.png', '/SUP1.png', '/SUP2.png'],
  },
  {
    room_type: 'Deluxe Room',
    price_per_night: 1200,
    photos: ['/delux.png', '/deluxe1.png', '/deluxe2.png', '/deluxe3.png'],
  },
  {
    room_type: 'Junior Suites',
    price_per_night: 1500,
    photos: ['/junior.png', '/JUNIOR1.png', '/JUNIOR2.png', '/JUNIOR3.png'],
  },
  {
    room_type: 'Executive Suites',
    price_per_night: 1800,
    photos: ['/executive.png', '/executive1.png', '/executive2.png', '/executive3.png'],
  },
  {
    room_type: 'Royal Suites',
    price_per_night: 2500,
    photos: ['/royal.png', '/ROYAL3.png', '/ROYAL2.png', '/Royal1.png'],
  },
  {
    room_type: 'Family Rooms',
    price_per_night: 1400,
    photos: ['/family.png', '/family1.png', '/family2.png', '/family3.png'],
  },
];

async function getOrCreateHotel() {
  // Check if hotel exists
  const { data: existingHotels, error: checkError } = await supabase
    .from('hotels')
    .select('hotel_id')
    .limit(1);

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  if (existingHotels && existingHotels.length > 0) {
    return existingHotels[0].hotel_id;
  }

  // Create hotel if it doesn't exist
  const { data: newHotel, error: createError } = await supabase
    .from('hotels')
    .insert({
      hotel_name: 'StayEase Luxury Hotel',
      address: '56 Railway Street, Annadale',
      city: 'Polokwane',
      country: 'South Africa',
      price_range: 'R1000-R2500',
      star_rating: 5,
      amenities: ['Wi-Fi', 'Pool', 'Gym', 'Spa', 'Restaurant'],
    })
    .select('hotel_id')
    .single();

  if (createError) {
    throw createError;
  }

  return newHotel.hotel_id;
}

async function seedRooms() {
  console.log('🌱 Starting to seed rooms data...\n');

  try {
    // Get or create hotel
    console.log('📋 Getting or creating hotel...');
    const hotelId = await getOrCreateHotel();
    console.log(`✅ Hotel ID: ${hotelId}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const room of roomsData) {
      try {
        // Insert or update room
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .upsert(
            {
              hotel_id: hotelId,
              room_type: room.room_type,
              price_per_night: room.price_per_night,
              availability_status: 'available',
            },
            {
              onConflict: 'room_type,hotel_id',
              ignoreDuplicates: false,
            }
          )
          .select('room_id')
          .single();

        if (roomError) {
          // If upsert doesn't work, try insert then update
          const { data: existingRoom } = await supabase
            .from('rooms')
            .select('room_id')
            .eq('hotel_id', hotelId)
            .eq('room_type', room.room_type)
            .single();

          if (existingRoom) {
            // Update existing room
            const { error: updateError } = await supabase
              .from('rooms')
              .update({
                price_per_night: room.price_per_night,
                availability_status: 'available',
              })
              .eq('room_id', existingRoom.room_id);

            if (updateError) throw updateError;
            roomData = { room_id: existingRoom.room_id };
          } else {
            // Insert new room
            const { data: newRoom, error: insertError } = await supabase
              .from('rooms')
              .insert({
                hotel_id: hotelId,
                room_type: room.room_type,
                price_per_night: room.price_per_night,
                availability_status: 'available',
              })
              .select('room_id')
              .single();

            if (insertError) throw insertError;
            roomData = newRoom;
          }
        }

        const roomId = roomData.room_id;

        // Insert photos
        for (const photoUrl of room.photos) {
          const { error: photoError } = await supabase
            .from('roomphotos')
            .insert({
              room_id: roomId,
              photo_url: photoUrl,
            });

          if (photoError && photoError.code !== '23505') {
            // Ignore duplicate key errors
            console.warn(`⚠️  Warning inserting photo ${photoUrl}:`, photoError.message);
          }
        }

        console.log(`✅ Successfully inserted/updated: ${room.room_type} (ID: ${roomId})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error inserting ${room.room_type}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);

    // Verify the data
    const { data: allRooms, error: fetchError } = await supabase
      .from('rooms')
      .select(`
        room_id,
        room_type,
        price_per_night,
        availability_status,
        roomphotos (photo_id, photo_url)
      `)
      .eq('hotel_id', hotelId)
      .order('price_per_night');

    if (!fetchError && allRooms) {
      console.log(`\n📋 Total rooms in database: ${allRooms.length}`);
      console.log('\nRooms list:');
      allRooms.forEach(room => {
        const photoCount = room.roomphotos ? room.roomphotos.length : 0;
        console.log(`   - ${room.room_type} (ID: ${room.room_id}): R${room.price_per_night} - ${photoCount} photos`);
      });
    }

    console.log(`\n🎉 Seeding complete!`);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.log('\n💡 Make sure:');
    console.log('   1. The "hotels", "rooms", and "roomphotos" tables exist');
    console.log('   2. You have the correct permissions');
    console.log('   3. RLS (Row Level Security) policies allow inserts');
  }
}

// Run the seeding
seedRooms();
