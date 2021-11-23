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
      const data = (action.payload as unknown) as TodoRecord[]
      const { done, pending } = groupByCompleteStats(data)
      const hashtags = pending.map((todo) => todo.hashtags).flat()
      const taggedUsers = pending.map((todo) => todo.taggedUsers).flat()      
      
      state.done = done
      state.pending = pending
      state.hashtags = Array.from(new Set(hashtags))
      state.taggedUsers = Array.from(new Set(taggedUsers))
    })

    builder.addCase(readTodo.rejected, (state, action) => {
      console.log(action)
    })

    builder.addCase(createTodo.rejected, (state, action) => {
      alert(1)
    })
  },
})


// Helper method
function groupByCompleteStats(data: TodoRecord[]): Todo {
  const stub: Todo = {
    done: [],
    pending: [],
  }

  return data.reduce((box: any, item: any) => {
    if (item.isCompleted) {
      box.done.push(item)
    }else{
      box.pending.push(item)
    }
    return box
  }, stub)
}


export const { setFilter } = todoSlice.actions

export default todoSlice.reducer
