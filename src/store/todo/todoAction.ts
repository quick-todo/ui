import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'core/axios'


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
