import { useDispatch } from "react-redux";
import { readTodo, toggleCompleteStatus } from "store/todoSlice"
import { AppDispatch } from 'store'
import { useCallback } from "react";

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
  

  return <div className="flex flex-wrap border-2 rounded-md bg-white p-2">
    <div className="flex-none mr-2">
      <input type="checkbox" onClick={toggleItem} checked={record.isCompleted} readOnly />
    </div>
    <p className={`flex-grow mr-2 ${record.isCompleted ? 'line-through' : '' }`}>
      { record?.task }
    </p>
    {/* <div className="flex items-center">
      <Dots width="15" height="3" />
    </div> */}
  </div>
}

export default TodoItem;
