# API Integration Guide

This document outlines the API endpoints that your Railway backend needs to implement for the hotel booking frontend to work properly.

## Base URL
The frontend is configured to use: `https://backend-production-4b74.up.railway.app/api`

## Authentication Endpoints

### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### POST `/api/auth/signin`
Sign in an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

**Headers:** All authenticated requests require `Authorization: Bearer <token>`

## Room Endpoints

### GET `/api/rooms`
Get all available rooms.

**Response:**
```json
[
  {
    "id": "room_id",
    "name": "Superior Room",
    "slug": "superior",
    "description": "Experience comfort and elegance...",
    "pricePerNight": 1000,
    "images": {
      "main": "/SUPERIOR.png",
      "thumbnails": ["/SUP1.png", "/SUP2.png", "/SUP3.png"]
    },
    "features": ["Wi-Fi", "King Bed", "Bath-tub"],
    "amenities": ["City View"],
    "maxGuests": 3,
    "maxRooms": 3,
    "view": "City View",
    "bedType": "King Bed / 2 Single Beds"
  }
]
```

### GET `/api/rooms/:id`
Get a specific room by ID.

**Response:** Same as single room object above.

### GET `/api/rooms/slug/:slug`
Get a room by slug (e.g., "superior", "deluxe").

**Response:** Same as single room object above.

### GET `/api/rooms/:id/availability`
Check room availability for given dates.

**Query Parameters:**
- `checkIn`: ISO date string
- `checkOut`: ISO date string

**Response:**
```json
{
  "available": true
}
```

## Booking Endpoints

### POST `/api/bookings`
Create a new booking.

**Request Body:**
```json
{
  "roomId": "room_id",
  "checkIn": "2025-11-21",
  "checkOut": "2025-11-23",
  "numberOfRooms": 2,
  "numberOfGuests": 5,
  "includeBreakfast": true
}
```

**Response:**
```json
{
  "booking": {
    "id": "booking_id",
    "bookingNumber": "00000038",
    "roomId": "room_id",
    "roomName": "Superior Room",
    "checkIn": "2025-11-21",
    "checkOut": "2025-11-23",
    "numberOfRooms": 2,
    "numberOfGuests": 5,
    "includeBreakfast": true,
    "status": "pending",
    "totalAmount": 6500,
    "createdAt": "2025-11-20T10:00:00Z",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
  },
  "message": "Booking created successfully"
}
```

### GET `/api/bookings`
Get all bookings for the authenticated user.

**Response:**
```json
[
  {
    "id": "booking_id",
    "bookingNumber": "00000038",
    "roomId": "room_id",
    "roomName": "Superior Room",
    "checkIn": "2025-11-21",
    "checkOut": "2025-11-23",
    "numberOfRooms": 2,
    "numberOfGuests": 5,
    "includeBreakfast": true,
    "status": "confirmed",
    "totalAmount": 6500,
    "createdAt": "2025-11-20T10:00:00Z"
  }
]
```

### GET `/api/bookings/:id`
Get a specific booking by ID.

**Response:** Same as single booking object above.

### DELETE `/api/bookings/:id`
Cancel a booking.

## User/Profile Endpoints

### GET `/api/users/profile`
Get the authenticated user's profile.

**Response:**
```json
{
  "id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "profileImage": "/user.png"
}
```

### PUT `/api/users/profile`
Update the authenticated user's profile.

**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "0987654321",
  "profileImage": "https://example.com/image.png"
}
```

**Response:** Same as GET profile response.

### POST `/api/users/profile/image`
Upload a profile image.

**Request:** `multipart/form-data` with field name `image`

**Response:**
```json
{
  "imageUrl": "https://example.com/uploaded-image.png"
}
```

## Payment Endpoints

### POST `/api/payments`
Process a payment for a booking.

**Request Body:**
```json
{
  "bookingId": "booking_id",
  "cardholderName": "John Doe",
  "cardNumber": "1234567890123456",
  "cardExpiry": "12/25",
  "cvv": "123",
  "saveBanking": false
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "trans_123456",
  "message": "Payment processed successfully",
  "booking": {
    "id": "booking_id",
    "bookingNumber": "00000038",
    "status": "confirmed"
  }
}
```

### GET `/api/payments/booking/:bookingId`
Get payment details for a booking.

**Response:**
```json
{
  "id": "payment_id",
  "bookingId": "booking_id",
  "amount": 6500,
  "status": "completed",
  "transactionId": "trans_123456",
  "createdAt": "2025-11-20T10:00:00Z"
}
```

## Error Responses

All endpoints should return errors in the following format:

```json
{
  "message": "Error message here"
}
```

**Status Codes:**
- `400`: Bad Request
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

## CORS Configuration

The backend must allow CORS from your frontend domain and include credentials:
- `Access-Control-Allow-Origin`: Your frontend URL
- `Access-Control-Allow-Credentials`: `true`
- `Access-Control-Allow-Methods`: `GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers`: `Content-Type, Authorization`

## Notes

1. All dates should be in ISO 8601 format (YYYY-MM-DD or full ISO datetime)
2. The frontend stores the JWT token in localStorage and sends it in the `Authorization` header
3. If a 401 error is returned, the frontend automatically redirects to the sign-in page
4. The frontend has fallback data for rooms if the API fails, but all other features require the backend to be functional

