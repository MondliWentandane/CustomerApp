/**
 * Room Data Transformation Utilities
 * 
 * Transforms database room data to match the frontend Room interface
 */

export interface DatabaseRoom {
  room_id: number;
  room_type: string;
  price_per_night: string | number;
  availability_status: string;
  hotel_id?: number;
  hotel_name?: string;
  city?: string;
  country?: string;
  photos?: Array<{ photo_id?: number; photo_url: string }>;
  price_per_night_info?: {
    amount: number;
    currency: string;
    formatted: string;
  };
}

export interface TransformedRoom {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerNight: number;
  images: {
    main: string;
    thumbnails: string[];
  };
  features: string[];
  amenities: string[];
  maxGuests: number;
  maxRooms: number;
  view?: string;
  bedType?: string;
  hotelId?: number; // Add hotel_id for booking creation
}

/**
 * Generate slug from room type
 */
function generateSlug(roomType: string): string {
  return roomType
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Get default description based on room type
 */
function getDefaultDescription(roomType: string): string {
  const descriptions: Record<string, string> = {
    'Superior Room': 'Experience comfort and elegance in our Superior Room, thoughtfully designed for relaxation and simplicity for guests seeking a peaceful retreat.',
    'Deluxe Room': 'Our Deluxe Room offers an elevated sense of luxury with its spacious layout and premium finishes, perfect for extended stays.',
    'Junior Suites': 'Step into refined luxury with our Junior Suites, offering a semi-separate living space and enhanced amenities for a truly comfortable stay.',
    'Executive Suites': 'Crafted for both business and leisure, the Executive Suites offers comfort with a professional touch and exclusive access to executive lounge privileges.',
    'Royal Suites': 'The Royal Suites offers expansive elegance with exclusive amenities and luxurious décor, representing the ultimate in lavish accommodation.',
    'Family Rooms': 'The Family Rooms provides generous space, comfort, and kid-friendly amenities for memorable stays with the whole family.',
  };
  
  return descriptions[roomType] || `Experience comfort and elegance in our ${roomType}, thoughtfully designed for relaxation and peace.`;
}

/**
 * Transform database room to frontend Room format
 */
export function transformRoom(dbRoom: DatabaseRoom): TransformedRoom {
  const slug = generateSlug(dbRoom.room_type);
  
  // Get price - prefer price_per_night_info.amount if available, otherwise parse price_per_night
  let pricePerNight: number;
  if (dbRoom.price_per_night_info?.amount) {
    pricePerNight = dbRoom.price_per_night_info.amount;
  } else {
    pricePerNight = typeof dbRoom.price_per_night === 'string' 
      ? parseFloat(dbRoom.price_per_night) 
      : dbRoom.price_per_night;
  }

  // Extract photos - handle both array formats
  const photos = dbRoom.photos || [];
  
  // Based on your API response, main image is typically the last one in the array
  // (e.g., "/SUPERIOR.png" for Superior Room, "/delux.png" for Deluxe Room)
  let mainImage = '/SUPERIOR.png';
  let thumbnails: string[] = [];
  
  if (photos.length > 0) {
    // Main image is the last photo in the array
    mainImage = photos[photos.length - 1]?.photo_url || photos[0]?.photo_url || '/SUPERIOR.png';
    // All other photos are thumbnails
    thumbnails = photos.slice(0, photos.length - 1)
      .map(p => p.photo_url)
      .filter(Boolean);
    
    // If we only have one photo, use it for both main and thumbnails
    if (thumbnails.length === 0 && photos.length === 1) {
      thumbnails = [mainImage, mainImage, mainImage];
    } else if (thumbnails.length < 3) {
      // Pad thumbnails if we have less than 3
      while (thumbnails.length < 3) {
        thumbnails.push(mainImage);
      }
    }
  }

  // Default features and amenities
  const defaultFeatures = ['Wi-Fi', 'King Bed', 'Bath-tub'];
  const defaultAmenities = ['City View'];

  return {
    id: dbRoom.room_id.toString(),
    name: dbRoom.room_type,
    slug: slug,
    description: getDefaultDescription(dbRoom.room_type),
    pricePerNight: pricePerNight,
    images: {
      main: mainImage,
      thumbnails: thumbnails.length > 0 ? thumbnails : [mainImage, mainImage, mainImage],
    },
    features: defaultFeatures,
    amenities: defaultAmenities,
    maxGuests: 3,
    maxRooms: 3,
    view: 'City View',
    bedType: 'King Bed / 2 Single Beds',
    hotelId: dbRoom.hotel_id, // Include hotel_id in transformed room
  };
}

/**
 * Transform array of database rooms
 */
export function transformRooms(dbRooms: DatabaseRoom[]): TransformedRoom[] {
  return dbRooms.map(transformRoom);
}

