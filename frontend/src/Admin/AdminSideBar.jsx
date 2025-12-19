import {Link} from "react-router-dom"

const AdminSideBar = () => {
    return (
        <>
            <div className='flex-col gap-2 my-4 hidden md:flex'>
                <Link to={"/admin/orders"} className='mb-2 py-1 px-2'>User Orders</Link>
                <Link to={"/admin/products"} className='mb-2 py-1 px-2'>Products</Link>
            </div>
        </>
    )
}

export default AdminSideBar