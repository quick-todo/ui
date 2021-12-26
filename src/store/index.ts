import { configureStore } from '@reduxjs/toolkit'
import todoReducer from 'store/todo/todoSlice'
import errorReducer from 'store/error/errorSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
