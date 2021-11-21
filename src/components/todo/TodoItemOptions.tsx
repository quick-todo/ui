import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { deleteItem, readTodo } from 'store/todoSlice'
import { Dots } from 'svg/icons'

interface Props {
  record: any
}

function TodoItemOptions(props: Props) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  return <>
    <div className="flex items-center cursor-pointer" onClick={() => setShowDropdown(true)}>
      <Dots width="15" height="3" />
    </div>
    <Dropdown 
      show={showDropdown}
      onHide={() => setShowDropdown(false)}
      onDelete={() => {
        dispatch(deleteItem({id: props.record._id})).then(() => {
          dispatch(readTodo())
        })
      }}
    />
  </>
}


interface DropdownProps {
  show: boolean
  onHide: () => void
  onDelete: () => void
}

function Dropdown(props: DropdownProps) {
  let ref = useRef<HTMLDivElement>(null);
  

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onHide()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  })

  if (!props.show) {
    return null
  }

  return <div ref={ref} className="origin-top-right absolute right-0 mt-8 rounded shadow bg-white border">
    <div className="py-1" role="none">
      <button className="text-gray-700 block px-4 py-2 text-sm" onClick={props.onDelete}>Delete</button>
    </div>
  </div>
}

export default TodoItemOptions