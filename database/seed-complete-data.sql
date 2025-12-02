-- Complete Hotel and Rooms Data Seed Script
-- Extracted from frontend hardcoded data
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: Create Hotel (if doesn't exist)
-- ============================================
DO $$
DECLARE
  v_hotel_id INTEGER;
BEGIN
  -- Check if hotel exists
  SELECT hotel_id INTO v_hotel_id 
  FROM public.hotels 
  WHERE hotel_name = 'StayEase Luxury Hotel' 
  LIMIT 1;
  
  -- Create hotel if it doesn't exist
  IF v_hotel_id IS NULL THEN
    INSERT INTO public.hotels (
      hotel_name,
      address,
      city,
      country,
      price_range,
      star_rating,
      amenities
    ) VALUES (
      'StayEase Luxury Hotel',
      '56 Railway Street, Annadale',
      'Polokwane',
      'South Africa',
      'R1000-R2500',
      5,
      ARRAY['Wi-Fi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'City View', 'King Bed', 'Bath-tub']
    ) RETURNING hotel_id INTO v_hotel_id;
    
    RAISE NOTICE 'Created hotel with ID: %', v_hotel_id;
  ELSE
    RAISE NOTICE 'Hotel already exists with ID: %', v_hotel_id;
  END IF;

  -- ============================================
  -- STEP 2: Insert Rooms
  -- ============================================
  
  -- Delete existing rooms for this hotel (optional - comment out if you want to keep existing)
  -- DELETE FROM public.roomphotos WHERE room_id IN (SELECT room_id FROM public.rooms WHERE hotel_id = v_hotel_id);
  -- DELETE FROM public.rooms WHERE hotel_id = v_hotel_id;
  
  -- Insert all 6 room types
  INSERT INTO public.rooms (
    hotel_id,
    room_type,
    price_per_night,
    availability_status
  ) VALUES
    (v_hotel_id, 'Superior Room', 1000.00, 'available'),
    (v_hotel_id, 'Deluxe Room', 1200.00, 'available'),
    (v_hotel_id, 'Junior Suites', 1500.00, 'available'),
    (v_hotel_id, 'Executive Suites', 1800.00, 'available'),
    (v_hotel_id, 'Royal Suites', 2500.00, 'available'),
    (v_hotel_id, 'Family Rooms', 1400.00, 'available')
  ON CONFLICT DO NOTHING;

  -- ============================================
  -- STEP 3: Insert Room Photos
  -- ============================================
  
  -- Superior Room Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/SUPERIOR.png'),
    ('/SUP3.png'),
    ('/SUP1.png'),
    ('/SUP2.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Superior Room' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Deluxe Room Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/delux.png'),
    ('/deluxe1.png'),
    ('/deluxe2.png'),
    ('/deluxe3.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Deluxe Room' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Junior Suites Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/junior.png'),
    ('/JUNIOR1.png'),
    ('/JUNIOR2.png'),
    ('/JUNIOR3.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Junior Suites' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Executive Suites Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/executive.png'),
    ('/executive1.png'),
    ('/executive2.png'),
    ('/executive3.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Executive Suites' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Royal Suites Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/royal.png'),
    ('/ROYAL3.png'),
    ('/ROYAL2.png'),
    ('/Royal1.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Royal Suites' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Family Rooms Photos (4 photos)
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT r.room_id, photo_url
  FROM public.rooms r
  CROSS JOIN (VALUES 
    ('/family.png'),
    ('/family1.png'),
    ('/family2.png'),
    ('/family3.png')
  ) AS photos(photo_url)
  WHERE r.room_type = 'Family Rooms' AND r.hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  RAISE NOTICE '✅ Successfully seeded hotel, rooms, and photos!';
  RAISE NOTICE 'Hotel ID: %', v_hotel_id;
END $$;

-- ============================================
-- STEP 4: Verify the data
-- ============================================
SELECT 
  h.hotel_id,
  h.hotel_name,
  h.address,
  h.city,
  COUNT(DISTINCT r.room_id) as total_rooms,
  COUNT(rp.photo_id) as total_photos
FROM public.hotels h
LEFT JOIN public.rooms r ON h.hotel_id = r.hotel_id
LEFT JOIN public.roomphotos rp ON r.room_id = rp.room_id
WHERE h.hotel_name = 'StayEase Luxury Hotel'
GROUP BY h.hotel_id, h.hotel_name, h.address, h.city;

-- ============================================
-- STEP 5: View all rooms with photos
-- ============================================
SELECT 
  r.room_id,
  r.room_type,
  r.price_per_night,
  r.availability_status,
  COUNT(rp.photo_id) as photo_count,
  STRING_AGG(rp.photo_url, ', ' ORDER BY rp.photo_id) as photos
FROM public.rooms r
LEFT JOIN public.roomphotos rp ON r.room_id = rp.room_id
GROUP BY r.room_id, r.room_type, r.price_per_night, r.availability_status
ORDER BY r.price_per_night;

