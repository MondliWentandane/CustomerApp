
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const BOOKING_DETAILS = {
    Name: 'Matsekoleng Ashley',
    Email: 'ashley@gmail.com',
    BookingNumber: '00000038',
    BookingDate: '20 November',
    Status: 'Confirmed',
    CheckIn: 'Sunday, 21 November 2025',
    CheckOut: 'Sunday, 23 November 2025', 
    Guests: 5,
    Rooms: 2,
    RoomType: 'Superior Rooms',
    Nights: 3, 
};


const ROOM_RATE_PER_NIGHT = 1000;
const ROOM_CLEANING_PER_NIGHT = 100;
const BREAKFAST_PER_PERSON_PER_NIGHT = 150;
const SERVICE_FEE = 100;

const totalRoomCost = ROOM_RATE_PER_NIGHT * BOOKING_DETAILS.Rooms * BOOKING_DETAILS.Nights; 
const totalBreakfastCost = BREAKFAST_PER_PERSON_PER_NIGHT * BOOKING_DETAILS.Guests * BOOKING_DETAILS.Nights; 
const totalCleaningCost = ROOM_CLEANING_PER_NIGHT * BOOKING_DETAILS.Rooms * BOOKING_DETAILS.Nights; 
const finalTotal = totalRoomCost + totalBreakfastCost + totalCleaningCost + SERVICE_FEE; 

const ConfirmationPage = () => {
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
                            <p>Check In: <span className="float-right font-medium">{BOOKING_DETAILS.CheckIn}</span></p>
                            <p>Check Out: <span className="float-right font-medium">{BOOKING_DETAILS.CheckOut}</span></p> 
                            <p>Guests: <span className="float-right font-medium">{BOOKING_DETAILS.Guests} Guests</span></p>
                            <p>Units/Rooms: <span className="float-right font-medium">{BOOKING_DETAILS.Rooms} {BOOKING_DETAILS.RoomType}</span></p>
                        </div>

                        {/* Guest/Confirmation Info */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-gray-800">Booking Details (Cont.)</h2>
                            <p>Name: <span className="float-right font-medium">{BOOKING_DETAILS.Name}</span></p>
                            <p>Email: <span className="float-right font-medium">{BOOKING_DETAILS.Email}</span></p>
                            <p>Booking #: <span className="float-right font-medium">{BOOKING_DETAILS.BookingNumber}</span></p>
                            <p>Booking Date: <span className="float-right font-medium">{BOOKING_DETAILS.BookingDate}</span></p>
                            <p>Status: <span className="float-right font-medium text-green-600">{BOOKING_DETAILS.Status}</span></p>
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
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">**{BOOKING_DETAILS.Nights} days stay** ({BOOKING_DETAILS.RoomType})</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{BOOKING_DETAILS.Rooms} Rooms x {BOOKING_DETAILS.Nights} Nights</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{ROOM_RATE_PER_NIGHT.toLocaleString()}</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{totalRoomCost.toLocaleString()}</td>
                                </tr>
                                
                                {/* Breakfast Cost */}
                                <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">**{BOOKING_DETAILS.Nights} days Breakfast** (5 Guests)</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{BOOKING_DETAILS.Guests} Guests x {BOOKING_DETAILS.Nights} Nights</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">R{BREAKFAST_PER_PERSON_PER_NIGHT.toLocaleString()}</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-right font-semibold">R{totalBreakfastCost.toLocaleString()}</td>
                                </tr>
                                
                                {/* Room Cleaning Cost */}
                                <tr>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">Room cleaning</td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">{BOOKING_DETAILS.Rooms} Rooms x {BOOKING_DETAILS.Nights} Nights</td>
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
                        <button className="w-full border border-gray-400 text-gray-700 py-2 sm:py-3 rounded font-semibold hover:bg-gray-50 transition flex items-center justify-center text-sm sm:text-base">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back To Home
                        </button>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ConfirmationPage;