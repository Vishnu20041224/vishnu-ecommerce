import React from 'react'
import AdminOrders from './AdminOrders'
import AdminSideBar from './AdminSideBar'

const Admin = () => {
    return (
        <>
            <div>
                <div className='flex gap-2'>
                    {/* Side Bar */}

                    <AdminSideBar />

                    {/* Main Section*/}
                    <div className='flex-1'>
                        <AdminOrders />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin