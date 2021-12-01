import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readTodo, createTodo } from 'store/todo/todoAction'

interface TodoRecord {
  _id: string
  task: string
  isCompleted: boolean
  hashtags: string[]
  taggedUsers: string[]
  createdAt: string
  updatedAt: string
}

interface Todo {
  done: TodoRecord[]
  pending: TodoRecord[]
}

export type TodoState = Todo & {
  isLoading: boolean
  hashtags: string[]
  taggedUsers: string[]
  activeFilter: string
}

const initialState: TodoState = {
  done: [], 
  pending: [],
  isLoading: false,
  hashtags: [],
  taggedUsers: [],
  activeFilter: ''
}

const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(readTodo.fulfilled, (state, action) => {
      const { done, pending, hashtags, taggedUsers } = action.payload as any
      state.done = done
      state.pending = pending
      state.hashtags = hashtags
      state.taggedUsers = taggedUsers
    })

    builder.addCase(readTodo.rejected, (state, action) => {
      console.log(action)
    })

    builder.addCase(createTodo.rejected, (state, action) => {
      alert(1)
    })
  },
})


export const { setFilter } = todoSlice.actions

export default todoSlice.reducer
