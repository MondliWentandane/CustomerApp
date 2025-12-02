import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { bookingService, type Booking } from '../services/bookingService';
import { userService, type User } from '../services/userService';

const ROOM_RATE_PER_NIGHT = 1000;
const ROOM_CLEANING_PER_NIGHT = 100;
const BREAKFAST_PER_PERSON_PER_NIGHT = 150;
const SERVICE_FEE = 100;

const ConfirmationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingId = searchParams.get('bookingId');
                
                // Try to get booking from sessionStorage first (if coming from payment)
                const bookingStr = sessionStorage.getItem('currentBooking');
                if (bookingStr) {
                    try {
                        const bookingData = JSON.parse(bookingStr);
                        setBooking(bookingData);
                    } catch (e) {
                        console.error('Error parsing booking from session:', e);
                    }
                }
                
                // If bookingId is provided, fetch from API
                if (bookingId && !booking) {
                    const bookingData = await bookingService.getBookingById(bookingId);
                    setBooking(bookingData);
                }
                
                // Fetch user profile
                try {
                    const userData = await userService.getProfile();
                    setUser(userData);
                } catch (err: any) {
                    console.error('Error fetching user:', err);
                    // Fallback to localStorage
                    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
                    if (localUser && localUser.email) {
                        setUser({
                            id: localUser.id || '',
                            fullName: localUser.fullName || localUser.name || '',
                            email: localUser.email || '',
                            phone: localUser.phone || localUser.phone_number || '',
                            profileImage: localUser.profileImage || localUser.profile_image,
                        });
                    }
                }
            } catch (err: any) {
                console.error('Error fetching confirmation data:', err);
                setError(err.message || 'Failed to load booking confirmation');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-xl">Loading confirmation...</p>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <p className="text-xl text-red-600 mb-4">{error || 'Booking not found'}</p>
                    <Link to="/profile" className="text-[#DC9E38] hover:underline">
                        Go to My Bookings
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate dates and costs
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const totalRoomCost = ROOM_RATE_PER_NIGHT * booking.numberOfRooms * nights;
    const totalBreakfastCost = BREAKFAST_PER_PERSON_PER_NIGHT * booking.numberOfGuests * nights;
    const totalCleaningCost = ROOM_CLEANING_PER_NIGHT * booking.numberOfRooms * nights;
    const finalTotal = totalRoomCost + totalBreakfastCost + totalCleaningCost + SERVICE_FEE;

    // Format dates
    const checkInFormatted = checkInDate.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const checkOutFormatted = checkOutDate.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const bookingDateFormatted = new Date(booking.createdAt).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long' 
    });

    // Get user info (use booking user if available, otherwise logged-in user)
    const displayUser = booking.user?.fullName ? booking.user : user;
    const displayName = displayUser?.fullName || 'Guest';
    const displayEmail = displayUser?.email || '';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar /> 

            <main className="grow">
                <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 font-sans">
                    
                    {/* Header and Contact Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start pb-6 sm:pb-8 border-b border-gray-300 gap-4">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="StayEase Logo" className="w-10 h-10 sm:w-12 sm:h-12 mr-2" />
                            <span className="text-lg sm:text-xl font-bold text-gray-800">StayEase</span>
                        </div>
                        <div className="text-left sm:text-right text-xs sm:text-sm text-gray-600">
                            <p>15 biccard st, Polokwane, ZA</p>
                            <p className="text-blue-600">inquire@stayease.mail</p>
                            <p>+27 7567 7856 9</p>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 text-gray-900">
                        Booking Confirmation
                    </h1>

                    {/* Booking & Guest Details Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-2 text-gray-700 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10">
                        {/*Stay Details */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-gray-800">Booking Details</h2>
                            <p>Check In: <span className="float-right font-medium">{checkInFormatted}</span></p>
                            <p>Check Out: <span className="float-right font-medium">{checkOutFormatted}</span></p> 
                            <p>Guests: <span className="float-right font-medium">{booking.numberOfGuests} Guests</span></p>
                            <p>Units/Rooms: <span className="float-right font-medium">{booking.numberOfRooms} {booking.roomName}</span></p>
                        </div>

                        {/* Guest/Confirmation Info */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-gray-800">Booking Details (Cont.)</h2>
                            <p>Name: <span className="float-right font-medium">{displayName}</span></p>
                            <p>Email: <span className="float-right font-medium">{displayEmail}</span></p>
                            <p>Booking #: <span className="float-right font-medium">{booking.bookingNumber || booking.id}</span></p>
                            <p>Booking Date: <span className="float-right font-medium">{bookingDateFormatted}</span></p>
                            <p>Status: <span className="float-right font-medium text-green-600 capitalize">{booking.status}</span></p>
                        </div>
                    </div>

                    {/* --- Invoice Table --- */}
                    <div className="border border-gray-300 rounded-lg overflow-x-auto mb-6 sm:mb-8 md:mb-10">
                        <table className="min-w-full table-auto text-xs sm:text-sm md:text-base">
                            <thead className="bg-[#DC9E38] text-black">
                                <tr>
                                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left font-bold">Description</th>
                                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center font-bold">Quantity</th>
                                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center font-bold">Unit Price</th>
                                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-bold">Amount (R)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
                                
                                {/*  Room Stay Cost */}
                                <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">**{nights} days stay** ({booking.roomName})</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{booking.numberOfRooms} Rooms x {nights} Nights</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{ROOM_RATE_PER_NIGHT.toLocaleString()}</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{totalRoomCost.toLocaleString()}</td>
                                </tr>
                                
                                {/* Breakfast Cost */}
                                <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">**{nights} days Breakfast** ({booking.numberOfGuests} Guests)</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{booking.numberOfGuests} Guests x {nights} Nights</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{BREAKFAST_PER_PERSON_PER_NIGHT.toLocaleString()}</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{totalBreakfastCost.toLocaleString()}</td>
                                </tr>
                                
                                {/* Room Cleaning Cost */}
                                <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">Room cleaning</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{booking.numberOfRooms} Rooms x {nights} Nights</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{ROOM_CLEANING_PER_NIGHT.toLocaleString()}</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{totalCleaningCost.toLocaleString()}</td>
                                </tr>

                                {/* Service Fee */}
                                 <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">Service Fee</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">1</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{SERVICE_FEE.toLocaleString()} (Flat)</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{SERVICE_FEE.toLocaleString()}</td>
                                </tr>
                                
                                {/* Total Row */}
                                <tr className="bg-gray-50 font-bold border-t-2 border-gray-900">
                                    <td colSpan={3} className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right">Total Paid</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right text-base sm:text-lg text-green-700">R{finalTotal.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    


                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                        <button className="w-full bg-[#DC9E38] text-black py-2 sm:py-3 rounded font-semibold hover:bg-[#c38c2f] transition shadow-md text-sm sm:text-base">
                            Download Receipt
                        </button>
                        <button className="w-full bg-[#DC9E38] text-black py-2 sm:py-3 rounded font-semibold hover:bg-[#c38c2f] transition shadow-md text-sm sm:text-base">
                            Email Transcript
                        </button>
                        <Link 
                            to="/home" 
                            className="w-full border border-gray-400 text-gray-700 py-2 sm:py-3 rounded font-semibold hover:bg-gray-50 transition flex items-center justify-center text-sm sm:text-base"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back To Home
                        </Link>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ConfirmationPage;