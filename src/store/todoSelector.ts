import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { TodoState } from 'store/todoSlice'

const todoState = (state: RootState) => state.todo



export const pendingTodo = createSelector(todoState, (todo: TodoState) => {
  if (todo.activeFilter) {
    return todo.pending.filter((item) => {
      if (todo.activeFilter.startsWith('#')) {
        return item.hashtags.includes(todo.activeFilter)
      } else {
        return item.taggedUsers.includes(todo.activeFilter)
      }
    })
  }
  return todo.pending
})