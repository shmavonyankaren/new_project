import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../store"
import { ProductType } from '@/types'

type BucketId = {
	bucketId: number
}

type BucketProductType = BucketId & ProductType

// Define a type for the slice state
interface ProductsState {
	products: BucketProductType[] | [],
	bucketId: number
}

// Define the initial state using that type
const initialState: ProductsState = {
	products: [],
	bucketId: 0
}

export const bucketSlice = createSlice({
	name: 'bucket',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		add: (state, action: PayloadAction<ProductType>) => {

			state.products = [...state.products, { bucketId: state.bucketId, ...action.payload }]
			state.bucketId++;
			// state.products.push(action.payload)
		},
		remove: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((item) => item.bucketId !== action.payload);
			console.log(state.products)
		},
		removeAll: (state) => {
			state.products = [];
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

export const { add, remove, removeAll } = bucketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBucketProducts = (state: RootState) => state.products;

export default bucketSlice.reducer;