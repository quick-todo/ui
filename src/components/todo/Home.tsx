import Master from 'components/layout/Master'
import TodoItem from 'components/todo/TodoItem'
import AddItem from 'components/todo/AddItem'
import Divider from 'components/todo/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { readTodo } from 'store/todoSlice'
import { RootState } from 'store'
import { useEffect } from 'react'
import { pendingTodo } from 'store/todoSelector'


function Home() {
  const dispatch = useDispatch()
  const pending = useSelector(pendingTodo)
  const { done, isLoading } = useSelector((state: RootState) => state.todo)
  useEffect(() => {
    dispatch(readTodo())
  }, [dispatch])
  
  return (
  <Master>
    <h1 className="tp-heading font-medium text-xl text-center mb-6">TODO</h1>
    <AddItem />
    { isLoading && <p>Loading...</p> }
    { pending.map(((todo: any) => <TodoItem key={todo._id} record={todo} />)) }
    <Divider text="Done"/>
    { done.map((todo: any) => <TodoItem key={todo._id} record={todo} />) }
  </Master>
  )
}

export default Home