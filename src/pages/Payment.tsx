import React, { useState, useEffect } from 'react';
 import Navbar from "../components/Navbar";
 import Footer from "../components/Footer";
 import { Link, useNavigate } from "react-router-dom";
 import { paymentService } from "../services/paymentService";
 import type { Booking } from "../services/bookingService";


const SERVICE_FEE = 100;
const ROOM_CLEANING_PER_NIGHT = 100;
const BREAKFAST_PER_PERSON_PER_NIGHT = 150;


const calculateCosts = (
    roomRatePerNight: number,
    numberOfRooms: number,
    nights: number,
    numberOfGuests: number,
    includeBreakfast: boolean
) => {
    const totalRoomCostPerNight = roomRatePerNight * numberOfRooms;
    const totalRoomCost = totalRoomCostPerNight * nights;
    const totalCleaningCost = ROOM_CLEANING_PER_NIGHT * nights;
    
    let totalBreakfastCost = 0;
    if (includeBreakfast) {
        totalBreakfastCost = BREAKFAST_PER_PERSON_PER_NIGHT * numberOfGuests * nights;
    }

    const subtotal = totalRoomCost + totalCleaningCost + SERVICE_FEE + totalBreakfastCost;
    
    return {
        totalRoomCostPerNight,
        totalRoomCost,
        totalCleaningCost,
        serviceFee: SERVICE_FEE,
        totalBreakfastCost,
        finalTotal: subtotal,
    };
};



const PaymentPage = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [includeBreakfast, setIncludeBreakfast] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    // Removed card form data - using PayPal instead

    useEffect(() => {
        const bookingStr = sessionStorage.getItem('currentBooking');
        if (bookingStr) {
            try {
                const bookingData = JSON.parse(bookingStr);
                setBooking(bookingData);
                setIncludeBreakfast(bookingData.includeBreakfast || true);
            } catch (err) {
                console.error("Error parsing booking data:", err);
                navigate("/home");
            }
        } else {
            // Fallback to hardcoded data if no booking in session
            navigate("/home");
        }
    }, [navigate]);

    if (!booking) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center">
                <Navbar />
                <div className="mt-20 p-4">
                    <p>Loading booking details...</p>
                </div>
            </div>
        );
    }

    const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const nights = Math.ceil(
        (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 
        (1000 * 60 * 60 * 24)
    );

    const roomRatePerNight = 1000; // This should come from the room data
    const costs = calculateCosts(
        roomRatePerNight,
        booking.numberOfRooms,
        nights,
        booking.numberOfGuests,
        includeBreakfast
    );

    // Removed form change handler - using PayPal instead
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setProcessing(true);

        try {
            // Create PayPal order
            const order = await paymentService.createPayPalOrder({
                bookingId: booking.id,
            });
            
            // Redirect to PayPal for payment
            if (order.approvalUrl) {
                window.location.href = order.approvalUrl;
            } else {
                throw new Error("PayPal approval URL not received");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create payment order. Please try again.");
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center font-inter">
            {/* <Navbar /> */}
             <Navbar />
            <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8 max-w-3xl w-full mt-20 sm:mt-24 md:mt-30 mb-6 sm:mb-8 md:mb-10 mx-4">
                
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Payment Summary</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Date & Guest Summary */}
                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4 text-gray-700">
                    <div className="flex justify-between">
                        <span>Check In</span>
                        <span className="font-medium">{checkInDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Check Out</span>
                        <span className="font-medium">{checkOutDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Guests</span>
                        <span className="font-medium">{booking.numberOfGuests} Guests</span>
                    </div>
                </div>

                {/* Service Charges Breakdown */}
                <h2 className="text-lg font-bold mb-3">Service Charges</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    
                    {/* Room Rate */}
                    <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                        <span className="text-sm">
                            {booking.numberOfRooms} Rooms x {nights} Nights
                        </span>
                        <span className="text-sm">
                            R{costs.totalRoomCostPerNight.toLocaleString()} / night
                        </span>
                        <span className="font-medium text-sm">
                            R{costs.totalRoomCost.toLocaleString()}
                        </span>
                    </div>

                    {/* Room Cleaning */}
                    <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                        <span className="text-sm">Room Cleaning x {nights} Nights</span>
                        <span className="text-sm">R{ROOM_CLEANING_PER_NIGHT} / night</span>
                        <span className="font-medium text-sm">
                            R{costs.totalCleaningCost.toLocaleString()}
                        </span>
                    </div>
                    
                    {/* Breakfast */}
                    <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                        <span className="text-sm font-semibold">
                             Breakfast
                        </span>
                         <span className="text-sm">
                            {includeBreakfast 
                                ? `R${BREAKFAST_PER_PERSON_PER_NIGHT} p/p x ${booking.numberOfGuests} guests x ${nights} nights`
                                : 'Not selected'}
                        </span>
                        <span className="font-medium text-sm">
                            R{costs.totalBreakfastCost.toLocaleString()}
                        </span>
                    </div>
                    
                    {/* Service Fee */}
                    <div className="flex justify-between">
                        <span className="text-sm">Service Fee (Flat)</span>
                        <span className="text-sm"></span>
                        <span className="font-medium text-sm">R{costs.serviceFee.toLocaleString()}</span>
                    </div>
                </div>
                
                {/* 💡 BREAKFAST TOGGLE */}
                <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-8">
                    <span className="text-sm font-medium text-gray-700">
                        Toggle Breakfast Inclusion (R{costs.totalBreakfastCost.toLocaleString()} value)
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeBreakfast}
                            onChange={() => setIncludeBreakfast(!includeBreakfast)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#DC9E38]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DC9E38]"></div>
                    </label>
                </div>

                {/* Total Cost */}
                <div className="flex justify-between text-xl font-bold border-t-2 border-[#DC9E38] pt-3 mb-8">
                    <span>Total Cost</span>
                    <span>R{costs.finalTotal.toLocaleString()}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-4">Payment</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 mb-2">
                        <strong>Secure Payment via PayPal</strong>
                    </p>
                    <p className="text-xs text-blue-700">
                        You will be redirected to PayPal to complete your payment securely.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className="flex-1 py-2 sm:py-3 border border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 py-2 sm:py-3 bg-[#DC9E38] text-black rounded-lg font-semibold hover:bg-[#c38c2f] transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.174 1.351 1.05 3.3.15 5.22l-.003.006c-.9 1.92-2.5 3.21-5.15 3.21h-4.84c-.276 0-.5.224-.5.5v12.337zm.811-18.138l-2.32 14.138h6.81v-13.8H7.887zm13.273 4.09c.42-.9.49-1.81.19-2.64-.37-1.03-1.26-1.73-2.85-1.73h-5.09c.27.58.35 1.25.2 2.09l-.02.11c-.36 1.9-1.71 3.21-4.14 3.21H5.5c-.276 0-.5.224-.5.5v12.337h4.576l2.32-14.138h4.84c2.57 0 4.578.543 5.69 1.81 1.174 1.351 1.05 3.3.15 5.22l-.003.006c-.9 1.92-2.5 3.21-5.15 3.21h-4.84c-.276 0-.5.224-.5.5v1.337h7.46c.524 0 .972-.382 1.054-.901l1.108-19.636a.641.641 0 0 0-.633-.74H17.74a.641.641 0 0 0-.633.74l.275 4.9z"/>
                                    </svg>
                                    <span>Pay with PayPal</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

            </div>
            {/* <Footer /> */}
            <Footer />
        </div>
    );
};

export default PaymentPage;