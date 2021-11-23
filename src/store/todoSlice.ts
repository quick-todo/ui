import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'core/axios'

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

export const readTodo = createAsyncThunk(
  'todo/read', 
  () => axios.get('todo/read')
)
export const createTodo = createAsyncThunk(
  'todo/create', 
  (payload: any) => axios.post('todo/create', payload)
)
export const toggleCompleteStatus = createAsyncThunk(
  'todo/toggle-complete-status',
  (payload: any) => axios.post('todo/toggle-complete-status', payload)
)
export const deleteItem = createAsyncThunk(
  'todo/delete',
  (payload: any) => axios.post('todo/toggle-complete-status', payload)
)

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
