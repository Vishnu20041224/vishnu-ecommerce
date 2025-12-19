
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../util/api.js"

export const getProduct = createAsyncThunk(
  "product/GET",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.fetchProduct(query)
      console.log(res.data)
      console.log(query)
      return res.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch Product failed" }
      )
    }
  }
)

export const getOneProduct = createAsyncThunk(
  "product/GETONE",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.fetchOneProduct(id)
      console.log(res.data)
      return res.data.data
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Fetch One Product failed" }
      )
    }
  })

export const filterProducts = createAsyncThunk(
  "product/FILTER",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.fetchProduct(query)
      console.log(res.data)
      return res.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Filter failed" }
      )
    }
  }
)

export const adminFilterProducts = createAsyncThunk(
  "product/Admin/FILTER",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.fetchProduct(query)
      console.log(res.data)
      return res.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Filter failed" }
      )
    }
  }
)


// Admin


export const deleteAdminProduct = createAsyncThunk(
  "admin/delete/product",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      let res = await api.adminDeleteProduct(token, id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Admin Acces failed" })

    }

  }

)


const initialState = {
  loading: false,
  error: null,

  singleProduct: null,

  allproducts: [],
  filteredProducts: [],
  adminfilteredProducts: [],


  phoneProducts: [],
  laptopProducts: [],
  shirtProducts: [],
  tshirtProducts: [],
  shoeProducts: [],
  headPhoneProducts: [],
  smartWatchProducts: [],
  sportProducts: [],
  tvProducts: [],
}

const filterByCategory = (products, category) =>
  products.filter(p => p.catergory === category)

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearFilter: (state) => {
      state.filteredProducts = []
    },
    adminClearFilter: (state) => {
      state.adminfilteredProducts = []
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getProduct.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        const products = action.payload || []

        state.loading = false
        state.allproducts = products

        state.phoneProducts = filterByCategory(products, "phone")
        state.laptopProducts = filterByCategory(products, "laptop")
        state.shirtProducts = filterByCategory(products, "shirt")
        state.tshirtProducts = filterByCategory(products, "tshirt")
        state.shoeProducts = filterByCategory(products, "Shoe")
        state.headPhoneProducts = filterByCategory(products, "Headphone")
        state.smartWatchProducts = filterByCategory(products, "SmartWatch")
        state.tvProducts = filterByCategory(products, "tv")
        state.sportProducts = filterByCategory(products, "sports")
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Something went wrong"
      })

      .addCase(filterProducts.pending, state => {
        state.loading = true
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.loading = false
        state.filteredProducts = action.payload || []
      })

      .addCase(filterProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message
      })

      .addCase(adminFilterProducts.pending, state => {
        state.loading = true
      })
      .addCase(adminFilterProducts.fulfilled, (state, action) => {
        state.loading = false
        state.adminfilteredProducts = action.payload || []
      })

      .addCase(adminFilterProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message
      })

      .addCase(getOneProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false
        state.singleProduct = action.payload
        state.error = null
      })

      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Something went wrong"
      })

      // admin

      .addCase(deleteAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allproducts = state.allproducts.filter(
          (pro) => pro._id !== action.payload
        );
        state.adminfilteredProducts = state.adminfilteredProducts.filter(
          (pro) => pro._id !== action.payload
        );
      })

      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Delete failed";
      });
  },
})

export const { clearFilter, adminClearFilter } = productSlice.actions;

export default productSlice.reducer
