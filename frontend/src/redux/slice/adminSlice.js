import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"


export const getAllAdminOrders = createAsyncThunk(
    "admin/getOrders",
    async (token,{rejectWithValue }) => {
        try {
            let res = await api.adminAllOrders(token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Admin Acces failed" })

        }

    }

)




const initialState = {
    error: null,
    token: null,
    loading: false,
    adminOders: []
}


const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllAdminOrders.pending, (state) => {
                state.loading = true
            })

            .addCase(getAllAdminOrders.fulfilled, (state,action) => {
                state.loading = false
                state.adminOders = action.payload
                state.error = null
            })

            .addCase(getAllAdminOrders.rejected, (state,action) => {
                state.loading = false
                state.adminOders = []
                state.error = action.payload.message
            })

            
    }
})


export default adminSlice.reducer