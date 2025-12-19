import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProduct, adminFilterProducts, adminClearFilter, deleteAdminProduct } from "../redux/slice/productSlice"
import AdminSideBar from "./AdminSideBar.jsx"
import { Link, useNavigate } from "react-router-dom"
import { formatPrice, getDeliveryDateFormatted } from "../redux/slice/commonfunctionSlice.js"
import RatingStars from "../components/ui/ratingStarts.jsx"
import HorizontalCartLoader from "../components/carts/HorizontalCartLoader.jsx"
import { Pencil, Trash, Search, X } from 'lucide-react';
import { useCookies } from "react-cookie"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// Pencil

const AdminProductes = () => {

    const dispatch = useDispatch()
    let [cookie] = useCookies(["token"])

    let { allproducts, loading, adminfilteredProducts } = useSelector((state) => state.product)

    //    search 

    let [searchQuery, setSearchQuery] = useState("");
    let [listOfSearchItem, setListOfSearchItem] = useState("");
    const navigate = useNavigate()

    const searchProduct = async () => {
        if (!searchQuery) return; // prevent empty search
        let res = await dispatch(adminFilterProducts({ search: searchQuery }));
        if (res.meta.requestStatus === "fulfilled") {
            // navigate("/search");
            setListOfSearchItem([])
            // setSearchQuery("")
        }
    };

    const [selectedIndex, setSelectedIndex] = useState(-1); // index of highlighted item

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (selectedIndex >= 0 && listOfSearchItem[selectedIndex]) {
                const item = listOfSearchItem[selectedIndex];
                setSearchQuery("");
                setListOfSearchItem([]);
                console.log(listOfSearchItem)
                setSelectedIndex(-1);
                navigate(`product/${item._id}`);
                //  admin/products/product/693802123fbb979a2711bff6
            } else {
                searchProduct(); // search if no item selected
            }
        } else if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, listOfSearchItem.length - 1));
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
    };


    const listOfSearches = () => {
        let list = allproducts.filter((item) => item.ditails.toLowerCase().includes(searchQuery.toLowerCase()));
        setListOfSearchItem(list)

    }

    const clearSearch = () => {
        setSearchQuery("");
        setListOfSearchItem([])
        if (searchQuery.trim() === "") {
            dispatch(adminClearFilter())

        }
        dispatch(getProduct())
    }


    // delete Product 

    const deleteProductByAdmin = async (id) => {
        try {
            const res = await dispatch(
                deleteAdminProduct({ token: cookie.token, id })
            ).unwrap();

            console.log("Deleted product ID:", res);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };




    useEffect(() => {
        if (allproducts.length === 0) {
            dispatch(getProduct())
        }
    }, [dispatch])

    if (loading) {
        return <>
            <HorizontalCartLoader />
        </>
    }

    return (
        <>
            <div>
                <div className='flex gap-2'>
                    {/* Side Bar */}

                    <AdminSideBar />

                    {/* Main Section*/}



                    <div className='flex-1'>

                        {/* search */}
                        <div className="flex justify-center items-center ">

                            <div className='flex gap-3 justify-center relative mx-3 w-full min-w-28 sm:flex-1 sm:max-w-md'>
                                <div className='flex my-2 items-center rounded-xl bg-white w-full min-w-28 sm:flex-1 sm:max-w-md black border border-gray-400'>
                                    <input
                                        onKeyUp={handleKeyDown}
                                        onChange={(e) => {
                                            listOfSearches()
                                            setSearchQuery(e.target.value)
                                        }}
                                        value={searchQuery}
                                        type="text"
                                        placeholder='Search...'
                                        className='outline-none w-24 f-full py-0 px-3 flex-1 text-black font-medium bg-white rounded-tl-xl rounded-bl-xl'
                                    />
                                    <button onClick={() => clearSearch()} className='p-2 rounded-tr-xl rounded-br-xl'>
                                        <X size={18} />
                                    </button>
                                    <button onClick={() => searchProduct()} className='p-2 rounded-tr-xl rounded-br-xl'>
                                        <Search size={18} />
                                    </button>
                                </div>
                                {/* search list */}
                                {searchQuery && listOfSearchItem.length > 0 && (
                                    <div className='absolute bg-white mt-1 top-10  max-h-60 overflow-y-auto w-full sm:max-w-md border border-gray-300 rounded-md shadow-lg z-10'>
                                        {listOfSearchItem.map((item, index) => (
                                            <Link 
                                                to={`product/${item._id}`}
                                                key={item._id}
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setListOfSearchItem([]);
                                                    setSelectedIndex(-1);
                                                    navigate(`product/${item._id}`);
                                                    // admin/products/product/693802123fbb979a2711bff6
                                                }}
                                                className={`px-4 py-2 cursor-pointer flex gap-1 items-center ${index === selectedIndex ? "bg-gray-200" : ""
                                                    }`}
                                            >
                                                <img className='w-8 aspect-square' src={item.mainImg} alt={item.name} />
                                                <span className='line-clamp-1'>{item.ditails}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        {adminfilteredProducts.length > 0 ?
                            adminfilteredProducts.map((product) => (

                                <div key={product._id} className='grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-[1100px] mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative'>
                                    <div className='col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden'>
                                        <img
                                            className='w-full h-full object-contain'
                                            src={product?.mainImg}
                                            alt={product?.name}
                                        />
                                    </div>
                                    <div className='col-span-6 md:col-span-6 '>
                                        {/* ditails */}
                                        <Link to={`product/${product?._id}`} className='flex flex-col justify-between md:gap-3 gap-1'>
                                            <h1 className='text-sm lg:text-xl font-semibold line-clamp-2'>{product?.ditails}</h1>

                                            {/* rating */}

                                            <div>{RatingStars(product?.rating)}</div>

                                            {/* rate */}
                                            <div className='flex gap-2 items-end'>
                                                <h1 className='text-lg md:text-2xl font-semibold'>{formatPrice(product?.price)}</h1>
                                                <h1 className='text-gray-600 md:text-sm text-xs'>M.R.P<span className='line-through px-1'>{formatPrice(product?.mrp)}</span></h1>
                                                <h1 className='text-red-600 md:text-sm text-xs'>{Math.round(((product?.mrp - product?.price) / product?.mrp) * 100)} % Off</h1>
                                            </div>

                                            {/* FREE delivery  */}

                                            <div>
                                                <h1 className='text-sm md:text-lg'>FREE delivery {getDeliveryDateFormatted(Math.floor(product?.rating))}</h1>
                                            </div>
                                        </Link>

                                        {/* addtocart */}

                                        <div className='flex gap-3 mt-3'>
                                            <button className="bg-amber-400 font-semibold md:text-sm text-xs hover:bg-yellow-200 hover:text-yellow-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white flex gap-2 items-center">< Pencil /> Edit</button>
                                            <button onClick={() => deleteProductByAdmin(product._id)} className="bg-red-400 font-semibold md:text-sm text-xs border-red-700 hover:bg-red-200 hover:text-red-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white transition-transform flex gap-2 items-center">Delete <Trash size={18} /></button>

                                        </div>
                                    </div>

                                    {/* {iswishListProduct ?
                                    <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white fill-red-700 cursor-pointer' />
                                    : <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white cursor-pointer' />
                                } */}
                                </div>))

                            : allproducts.map((product) => (

                                <div key={product._id} className='grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-[1100px] mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative'>
                                    <div className='col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden'>
                                        <img
                                            className='w-full h-full object-contain'
                                            src={product?.mainImg}
                                            alt={product?.name}
                                        />
                                    </div>
                                    <div className='col-span-6 md:col-span-6 '>
                                        {/* ditails */}
                                        <Link to={`product/${product?._id}`} className='flex flex-col justify-between md:gap-3 gap-1'>
                                            <h1 className='text-sm lg:text-xl font-semibold line-clamp-2'>{product?.ditails}</h1>

                                            {/* rating */}

                                            <div>{RatingStars(product?.rating)}</div>

                                            {/* rate */}
                                            <div className='flex gap-2 items-end'>
                                                <h1 className='text-lg md:text-2xl font-semibold'>{formatPrice(product?.price)}</h1>
                                                <h1 className='text-gray-600 md:text-sm text-xs'>M.R.P<span className='line-through px-1'>{formatPrice(product?.mrp)}</span></h1>
                                                <h1 className='text-red-600 md:text-sm text-xs'>{Math.round(((product?.mrp - product?.price) / product?.mrp) * 100)} % Off</h1>
                                            </div>

                                            {/* FREE delivery  */}

                                            <div>
                                                <h1 className='text-sm md:text-lg'>FREE delivery {getDeliveryDateFormatted(Math.floor(product?.rating))}</h1>
                                            </div>
                                        </Link>

                                        {/* addtocart */}

                                        <div className='flex gap-3 mt-3'>
                                            <button className="bg-amber-400 font-semibold md:text-sm text-xs hover:bg-yellow-200 hover:text-yellow-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white flex gap-2 items-center">< Pencil /> Edit</button>
                                            {/* <button onClick={() => deleteProductByAdmin(product._id)} className="bg-red-400 font-semibold md:text-sm text-xs border-red-700 hover:bg-red-200 hover:text-red-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white transition-transform flex gap-2 items-center">Delete <Trash size={18} /></button> */}

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                   <button  className="bg-red-400 font-semibold md:text-sm text-xs border-red-700 hover:bg-red-200 hover:text-red-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white transition-transform flex gap-2 items-center">Delete <Trash size={18} />
                                                    
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                           want to delete {product.name}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteProductByAdmin(product._id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>

                                    {/* {iswishListProduct ?
                                    <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white fill-red-700 cursor-pointer' />
                                    : <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white cursor-pointer' />
                                } */}
                                </div>))

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProductes