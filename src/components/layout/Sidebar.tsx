import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'store'
import { setFilter } from "store/todo/todoSlice"

function Sidebar() {
  const dispatch = useDispatch()
  const { hashtags, taggedUsers, activeFilter } = useSelector((state: RootState) => state.todo)
  return <>
    <DisplayHashtags 
      title="Hashtags"
      filters={hashtags}
    />

    <DisplayHashtags 
      title="People"
      filters={taggedUsers}
    />
    <h5 className="font-medium">Active Filter 
    { activeFilter && 
      <span className="cursor-pointer color-red text-red-500	italic" onClick={() => dispatch(setFilter(''))}> (clear)</span>      
    }
    </h5>
    <span>{activeFilter}</span>
  </>   
}

function DisplayHashtags(props: {filters: string[], title: string}) {
  const dispatch = useDispatch()
  if (!(props.filters.length > 0)) {
    return null
  }
  
  return <div className="mb-6">
    <h5 className="font-medium">{props.title}</h5>
    { props.filters.map((tag, i) => {
      return <span key={i+tag} 
        onClick={() => dispatch(setFilter(tag))}
        className="cursor-pointer font-semibold text-blue-800 m-1 p-px">
        {tag}
      </span>
    }) }
  </div>
}


export default Sidebar