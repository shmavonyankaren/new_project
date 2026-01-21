import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../store"
import { ProductType } from '@/types'

// Define a type for the slice state
interface ProductsState {
	products: ProductType[] | []
}

// Define the initial state using that type
const initialState: ProductsState = {
	products: [],
}

export const productsSlice = createSlice({
	name: 'products',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		initialise: (state, action: PayloadAction<ProductType[]>) => {
			state.products = [...action.payload]
		}
		// increment: (state) => {
		// 	state.value += 1
		// },
		// decrement: (state) => {
		// 	state.value -= 1
		// },
		// Use the PayloadAction type to declare the contents of `action.payload`
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload
		// },
	},
})

export const { initialise } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;