import axios from 'core/axios'
import Master from 'components/layout/Master'
import TodoItem from 'components/todo/TodoItem'
import AddItem from 'components/todo/AddItem'
import { useSelector, useDispatch } from 'react-redux'
import { readTodo } from 'store/todoSlice'
import { RootState } from 'store'
import { useEffect } from 'react'



// function getTodos() {
//   return axios.get('/todo/read')
// }

// export function groupByCompleteStats(records: any) {
//   const ret: {completed: Array<any>; pending: Array<any> } = {
//     completed: [],
//     pending: [],
//   }

//   for (const record of records) {
//     const groupIndex = record.isCompleted ? 'completed' : 'pending'
//     ret[groupIndex].push(record)
//   }
//   return ret
// }


function Home() {
  const dispatch = useDispatch()
  const {done, pending, isLoading} = useSelector((state: RootState) => state.todo)
  console.log(isLoading);
  

  useEffect(() => {
    dispatch(readTodo())
  }, [dispatch])
  
  return (
  <Master>
    <h2>TODO</h2>

    <AddItem />
    { isLoading && <p>Loading...</p> }

    {
      pending.map(((todo: any) => {
        return <TodoItem 
          key={todo._id}
          record={todo}
        />
      }))
    }
    
    <h2>Done</h2>
    {
      done.map((todo: any) => {
        return <TodoItem
          key={todo._id}
          record={todo}
        />
      })
    }
  </Master>
  )
}

export default Home