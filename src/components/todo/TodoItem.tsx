import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { readTodo, setFilter, toggleCompleteStatus } from 'store/todoSlice'
import  TodoItemOptions from 'components/todo/TodoItemOptions'
import RichText from 'components/todo/RichText'

interface TODOItemProps {
  record: any 
}

function TodoItem(props: TODOItemProps) {
  const {record} = props
  const dispatch = useDispatch<AppDispatch>()
  const toggleItem = useCallback((e: any) => {
    dispatch(toggleCompleteStatus({ taskId: record._id })).then(() => {
      dispatch(readTodo())
    })
  }, [record._id, dispatch])
  

  return <div className="flex flex-wrap border rounded bg-white py-2 px-2  my-2">
    <div className="flex-none mr-2">
      <input type="checkbox" onClick={toggleItem} checked={record.isCompleted} readOnly />
    </div>
    <div className={`flex-grow mr-2 ${record.isCompleted ? 'line-through' : '' }`}>
      <RichText
        filterClass="cursor-pointer font-semibold text-blue-800"
        text={record?.task}
        onFilterClick={ (e, token) => {
          dispatch(setFilter(token.value))
        }}
      />
    </div>
    <TodoItemOptions record={record} />
  </div>
}

export default TodoItem;
