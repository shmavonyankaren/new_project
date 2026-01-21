import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./features/products/productsSlice"
import BucketReducer from './features/bucket/bucketSlice';

export const store = configureStore({
	reducer: {
		products: ProductsReducer,
		bucketProducts: BucketReducer
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

