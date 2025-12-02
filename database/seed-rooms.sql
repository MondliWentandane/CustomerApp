-- Seed Rooms Data for Hotel Booking App
-- This script matches your actual database schema

-- IMPORTANT: Make sure you have a hotel record first!
-- If you don't have a hotel, uncomment and run this first:
/*
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
  ARRAY['Wi-Fi', 'Pool', 'Gym', 'Spa', 'Restaurant']
) RETURNING hotel_id;
*/

-- Get or set your hotel_id (replace 1 with your actual hotel_id)
-- You can find it by running: SELECT hotel_id FROM public.hotels LIMIT 1;
DO $$
DECLARE
  v_hotel_id INTEGER;
BEGIN
  -- Get the first hotel, or create one if none exists
  SELECT hotel_id INTO v_hotel_id FROM public.hotels LIMIT 1;
  
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
      ARRAY['Wi-Fi', 'Pool', 'Gym', 'Spa', 'Restaurant']
    ) RETURNING hotel_id INTO v_hotel_id;
  END IF;

  -- Insert Rooms
  INSERT INTO public.rooms (
    hotel_id,
    room_type,
    price_per_night,
    availability_status
  ) VALUES
  -- Superior Room
  (
    v_hotel_id,
    'Superior Room',
    1000,
    'available'
  ),
  -- Deluxe Room
  (
    v_hotel_id,
    'Deluxe Room',
    1200,
    'available'
  ),
  -- Junior Suites
  (
    v_hotel_id,
    'Junior Suites',
    1500,
    'available'
  ),
  -- Executive Suites
  (
    v_hotel_id,
    'Executive Suites',
    1800,
    'available'
  ),
  -- Royal Suites
  (
    v_hotel_id,
    'Royal Suites',
    2500,
    'available'
  ),
  -- Family Rooms
  (
    v_hotel_id,
    'Family Rooms',
    1400,
    'available'
  )
  ON CONFLICT DO NOTHING;

  -- Insert Room Photos
  -- Superior Room Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/SUPERIOR.png' FROM public.rooms WHERE room_type = 'Superior Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/SUP3.png' FROM public.rooms WHERE room_type = 'Superior Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/SUP1.png' FROM public.rooms WHERE room_type = 'Superior Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/SUP2.png' FROM public.rooms WHERE room_type = 'Superior Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Deluxe Room Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/delux.png' FROM public.rooms WHERE room_type = 'Deluxe Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/deluxe1.png' FROM public.rooms WHERE room_type = 'Deluxe Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/deluxe2.png' FROM public.rooms WHERE room_type = 'Deluxe Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/deluxe3.png' FROM public.rooms WHERE room_type = 'Deluxe Room' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Junior Suites Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/junior.png' FROM public.rooms WHERE room_type = 'Junior Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/JUNIOR1.png' FROM public.rooms WHERE room_type = 'Junior Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/JUNIOR2.png' FROM public.rooms WHERE room_type = 'Junior Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/JUNIOR3.png' FROM public.rooms WHERE room_type = 'Junior Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Executive Suites Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/executive.png' FROM public.rooms WHERE room_type = 'Executive Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/executive1.png' FROM public.rooms WHERE room_type = 'Executive Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/executive2.png' FROM public.rooms WHERE room_type = 'Executive Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/executive3.png' FROM public.rooms WHERE room_type = 'Executive Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Royal Suites Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/royal.png' FROM public.rooms WHERE room_type = 'Royal Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/ROYAL3.png' FROM public.rooms WHERE room_type = 'Royal Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/ROYAL2.png' FROM public.rooms WHERE room_type = 'Royal Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/Royal1.png' FROM public.rooms WHERE room_type = 'Royal Suites' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  -- Family Rooms Photos
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/family.png' FROM public.rooms WHERE room_type = 'Family Rooms' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/family1.png' FROM public.rooms WHERE room_type = 'Family Rooms' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/family2.png' FROM public.rooms WHERE room_type = 'Family Rooms' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.roomphotos (room_id, photo_url)
  SELECT room_id, '/family3.png' FROM public.rooms WHERE room_type = 'Family Rooms' AND hotel_id = v_hotel_id
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Successfully seeded rooms and photos for hotel_id: %', v_hotel_id;
END $$;

-- Verify the data was inserted
SELECT 
  r.room_id,
  r.room_type,
  r.price_per_night,
  r.availability_status,
  COUNT(rp.photo_id) as photo_count
FROM public.rooms r
LEFT JOIN public.roomphotos rp ON r.room_id = rp.room_id
GROUP BY r.room_id, r.room_type, r.price_per_night, r.availability_status
ORDER BY r.price_per_night;
