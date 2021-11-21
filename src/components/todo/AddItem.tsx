import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from 'store/todoSlice';

interface TODOItemProps {
  onSuccess?: () => void,
  onError?: (e: any) => void,
}


function TodoItem(props: TODOItemProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    const target = e.target as HTMLInputElement
    dispatch(createTodo({task: target.value}))
    target.value = ''
  }
  
  return <div className="flex flex-wrap border-2 rounded-md bg-white p-2">
    <div className="flex-none mr-2 select-none text-gray-300 text-2xl leading-5">+</div>
    <p className="flex-grow mr-2">
      <input
        ref={inputRef}
        className="focus:outline-none w-full" 
        type="text" 
        placeholder="add task"
        onKeyPress={onEnter}
      />
    </p>
  </div>
}

export default TodoItem;