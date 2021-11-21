import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TodoItem from 'components/todo/TodoItem'
import axios from 'core/axios'

interface TodoRecord {
  _id: string
  task: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

interface Todo {
  done: TodoRecord[]
  pending: TodoRecord[]
}


type TodoState = Todo & {
  isLoading: boolean
}

const initialState: TodoState = {
  done: [], 
  pending: [],
  isLoading: false,
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

const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTask: (state, action) => {},
    unshiftPendingItem: (state, action) => {}
  },
  extraReducers: (builder) => {
    builder.addCase(readTodo.fulfilled, (state, action) => {
      const data = (action.payload as unknown) as TodoRecord[]
      const {done, pending} = groupByCompleteStats(data)
      state.done = done
      state.pending = pending
    })

    builder.addCase(readTodo.rejected, (state, action) => {
      console.log(action)
    })

    builder.addCase(createTodo.rejected, (state, action) => {
      alert(1)
    })

    builder.addCase(createTodo.fulfilled, (state, action) => {
      const item = (action.payload as unknown) as TodoRecord
      state.pending.unshift(item)
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


export const {
  addTask
} = todoSlice.actions

export default todoSlice.reducer
