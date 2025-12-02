# Database Seeding Guide

This directory contains scripts to populate your Supabase database with the room data from the frontend.

## Option 1: Using SQL Script (Recommended for Supabase Dashboard)

### Steps:

1. **Open Supabase Dashboard**
   - Go to your Supabase project: https://supabase.com/dashboard
   - Navigate to SQL Editor

2. **Run the SQL Script**
   - Open `seed-rooms.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" or press `Ctrl+Enter`

3. **Verify**
   - Go to Table Editor
   - Check the `rooms` table
   - You should see 6 rooms inserted

### Note:
- Adjust the table name and column names in the SQL script to match your actual database schema
- The script uses `ON CONFLICT` to update existing records if they already exist

---

## Option 2: Using Node.js Script

### Prerequisites:
```bash
npm install @supabase/supabase-js dotenv
```

### Steps:

1. **Set up environment variables**
   - Make sure your `.env` file has:
     ```env
     SUPABASE_URL=https://gpwhxweltklvriossdmv.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```

2. **Run the script**
   ```bash
   node database/seed-rooms.js
   ```

3. **Verify**
   - Check your Supabase dashboard
   - The rooms should be inserted

---

## Option 3: Using Backend API Endpoint

If your backend has a seeding endpoint, you can create one:

```javascript
// Example backend endpoint
app.post('/api/admin/seed-rooms', async (req, res) => {
  // Insert rooms data
  // ...
});
```

Then call it:
```bash
curl -X POST https://backend-production-4b74.up.railway.app/api/admin/seed-rooms
```

---

## Database Schema

Your actual database schema uses these tables:

### `hotels` table
- `hotel_id` (primary key)
- `hotel_name`, `address`, `city`, `country`
- `price_range`, `star_rating`
- `amenities` (array)

### `rooms` table
- `room_id` (primary key)
- `hotel_id` (foreign key to hotels)
- `room_type` (VARCHAR) - e.g., "Superior Room"
- `price_per_night` (NUMERIC)
- `availability_status` (enum: 'available', etc.)

### `roomphotos` table
- `photo_id` (primary key)
- `room_id` (foreign key to rooms)
- `photo_url` (TEXT)

**Note:** The scripts automatically create a hotel if one doesn't exist, then insert rooms and their photos.

---

## Room Data Included

The scripts will insert these 6 rooms:

1. **Superior Room** - R1,000/night
2. **Deluxe Room** - R1,200/night
3. **Junior Suites** - R1,500/night
4. **Executive Suites** - R1,800/night
5. **Royal Suites** - R2,500/night
6. **Family Rooms** - R1,400/night

Each room includes:
- Name and slug
- Description
- Images (main + 3 thumbnails)
- Features and amenities
- Pricing
- Capacity limits

---

## Troubleshooting

### Error: "relation 'rooms' does not exist"
- Create the rooms table first using the schema above

### Error: "permission denied"
- Check Row Level Security (RLS) policies
- Use SERVICE_ROLE_KEY instead of ANON_KEY for seeding

### Error: "duplicate key value"
- The script uses `ON CONFLICT` to handle duplicates
- Existing rooms will be updated with new data

---

## Next Steps

After seeding:
1. Verify data in Supabase dashboard
2. Test the frontend - rooms should load from the database
3. Update room prices/descriptions as needed
4. Add more rooms through your admin panel or directly in Supabase

