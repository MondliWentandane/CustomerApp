import React, { useState } from 'react';
 import Navbar from "../components/Navbar";
 import Footer from "../components/Footer";
 import { Link } from "react-router-dom";


const ROOM_RATE_PER_NIGHT = 1000;
const NUMBER_OF_ROOMS = 2;
const NIGHTS = 3;
const SERVICE_FEE = 100;
const ROOM_CLEANING_PER_NIGHT = 100;
const BREAKFAST_PER_PERSON_PER_NIGHT = 150;
const NUMBER_OF_GUESTS = 5;


const calculateCosts = (includeBreakfast: boolean) => {
    const totalRoomCostPerNight = ROOM_RATE_PER_NIGHT * NUMBER_OF_ROOMS;
    const totalRoomCost = totalRoomCostPerNight * NIGHTS;
    const totalCleaningCost = ROOM_CLEANING_PER_NIGHT * NIGHTS;
    
    let totalBreakfastCost = 0;
    if (includeBreakfast) {
        totalBreakfastCost = BREAKFAST_PER_PERSON_PER_NIGHT * NUMBER_OF_GUESTS * NIGHTS;
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
    
    const [includeBreakfast, setIncludeBreakfast] = useState(true); 
    
   
    const costs = calculateCosts(includeBreakfast);

    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        cardExpiry: '',
        cvv: '',
        saveBanking: false,
    });
    
    const checkInDate = '23 November 2025';
    const checkOutDate = '26 November 2025';

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment submitted:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center font-inter">
            {/* <Navbar /> */}
             <Navbar />
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full mt-30 mb-10">
                
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Payment Summary</h1>

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
                        <span className="font-medium">{NUMBER_OF_GUESTS} Guests</span>
                    </div>
                </div>

                {/* Service Charges Breakdown */}
                <h2 className="text-lg font-bold mb-3">Service Charges</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    
                    {/* Room Rate */}
                    <div className="flex justify-between border-b border-gray-100 pb-2 mb-2">
                        <span className="text-sm">
                            {NUMBER_OF_ROOMS} Rooms x {NIGHTS} Nights
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
                        <span className="text-sm">Room Cleaning x {NIGHTS} Nights</span>
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
                                ? `R${BREAKFAST_PER_PERSON_PER_NIGHT} p/p x ${NUMBER_OF_GUESTS} guests x ${NIGHTS} nights`
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Cardholder Name */}
                    <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name:</label>
                        <input
                            type="text"
                            id="cardholderName"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleFormChange}
                            placeholder="Enter your names as they are on card..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#DC9E38] focus:border-[#DC9E38] outline-none"
                            required
                        />
                    </div>

                    {/* Card Number */}
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleFormChange}
                            placeholder="Enter the 16-digit number..."
                            maxLength={16}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#DC9E38] focus:border-[#DC9E38] outline-none"
                            required
                        />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Card Expiry:</label>
                            <input
                                type="text"
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleFormChange}
                                placeholder="MM / Y Y"
                                maxLength={7}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#DC9E38] focus:border-[#DC9E38] outline-none"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV / CVC:</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleFormChange}
                                placeholder="Enter the 3-digit number..."
                                maxLength={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#DC9E38] focus:border-[#DC9E38] outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Save Banking Details */}
                    <div className="flex items-center pt-2">
                        <input
                            type="checkbox"
                            id="saveBanking"
                            name="saveBanking"
                            checked={formData.saveBanking}
                            onChange={handleFormChange}
                            className="h-4 w-4 text-[#DC9E38] border-gray-300 rounded focus:ring-[#DC9E38]"
                        />
                        <label htmlFor="saveBanking" className="ml-2 block text-sm text-gray-900">
                            Save banking details
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            className="flex-1 py-3 border border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <Link to="/confirmation">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-[#DC9E38] w-[350px] text-black rounded-lg font-semibold hover:bg-[#c38c2f] transition"
                        >
                            Pay Now
                        </button>
                        </Link>
                    </div>
                </form>

            </div>
            {/* <Footer /> */}
            <Footer />
        </div>
    );
};

export default PaymentPage;