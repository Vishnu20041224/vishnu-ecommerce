import bestPrice from "../assets/FooterIcone/best-price.png"
import cashBack from "../assets/FooterIcone/refund2.png"
import van from "../assets/FooterIcone/free-shipping.png"
import { MapPin, Headset, Mail } from 'lucide-react';
import { Link } from "react-router-dom";
const FooterCart = () => {
  return (
     <>
                <div className='bg-gray-600 text-white'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 border-b-2  border-white'>
                            <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center '>
                                <div className="w-16">
                                    <img className="w-full object-contain aspect-square text-white" src={bestPrice} alt="bestPrice" />
                                </div>
                                <div>
                                    <h1 className="font-semibold uppercase">Best Prices & Deals</h1>
                                    <h1 className="">Don’t miss our daily amazing deals and prices</h1>
                                </div>
                            </div>
                            <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center'>
                                <div className="w-16">
                                    <img className="w-full object-contain aspect-square text-white" src={cashBack} alt="bestPrice" />
                                </div>
                                <div>
                                    <h1 className="font-semibold uppercase">Refundable</h1>
                                    <h1 className="">If your items have damage we agree to refund it</h1>
                                </div>
                            </div>
    
                            <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center'>
                                <div className="w-16">
                                    <img className="w-full object-contain aspect-square text-white" src={van} alt="bestPrice" />
                                </div>
                                <div>
                                    <h1 className="font-semibold uppercase">Free delivery</h1>
                                    <h1 className="">Do purchase over 500 and get free delivery anywhere</h1>
                                </div>
                            </div>
                        </div>
    
                        <div className='text-center p-4 md:p-6 lg:p-8 gap-2 md:gap-3 lg:gap-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
    
                            <div className="py-3 col-span-2 md:col-span-1">
                                <h1 className="text-2xl font-semibold mb-2 md:mb-4">E Commerce</h1>
                                <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                    <span className="flex gap-2 text-white font-semibold"><MapPin /> Address</span>
                                    <span className="text-gray-400">Chrompet Channai</span>
                                </h1>
                                <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                    <span className="flex gap-2 text-white font-semibold">
                                        <Headset />
                                        Call us
                                    </span>
                                    <span className="text-gray-400">+91 9176017127</span>
                                </h1>
                                <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                    <span className="flex gap-2 text-white font-semibold">
                                        <Mail />
                                        Email
                                    </span>
                                    <span className="text-gray-400">rhvishnushankar@gmail.com</span>
                                </h1>
    
                            </div>
    
                            <div className="py-3 col-span-1 flex flex-col gap-1">
                                <h1 className="text-2xl font-semibold md:mb-4">Features</h1>
                                <Link to={"/addtocart"} className="text-base text-gray-400 mb-1 md:mb-2">Add To Cart</Link>
                                <Link to={"/wishlist"} className="text-base text-gray-400 mb-1 md:mb-2">Wish List</Link>
                                <Link to={"/orders"} className="text-base text-gray-400 mb-1 md:mb-2">Orders</Link>
                                <Link to={"/orders"} className="text-base text-gray-400 mb-1 md:mb-2">Order Status</Link>
                            </div>
    
                             <div className="py-3 col-span-1 flex flex-col gap-1">
                                <h1 className="text-2xl font-semibold md:mb-4">Category</h1>
                                <Link to={"/"} className="text-base text-gray-400 mb-1 md:mb-2">Home Page</Link>
                                <Link to={"/phone"} className="text-base text-gray-400 mb-1 md:mb-2">Phone Products</Link>
                                <Link to={"/shirt"} className="text-base text-gray-400 mb-1 md:mb-2">Shirt Products</Link>
                                <Link to={"/tv"} className="text-base text-gray-400 mb-1 md:mb-2">tv Products</Link>
                            </div>
    
                            <div className="py-3 col-span-1 flex flex-col gap-1">
                                <h1 className="text-2xl font-semibold md:mb-4">Help Center</h1>
                                <h1 className="text-base text-gray-400 mb-1 md:mb-2">Conact</h1>
                                <h1 className="text-base text-gray-400 mb-1 md:mb-2">Payments</h1>
                                <h1 className="text-base text-gray-400 mb-1 md:mb-2">Refund</h1>
                                <Link to={"/orders"} className="text-base text-gray-400 mb-1 md:mb-2">Shipping</Link>
                            </div>
    
    
    
                        </div>
    
                    </div>
                </div>
            </>
  )
}

export default FooterCart