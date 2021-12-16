import { useSelector } from "react-redux";
import { RootState } from "store";

function Error(){
  const {success, error} = useSelector((state: RootState) => state.error)
  if (success) {
    return <div className="rounded p-2 bg-green-50">{success}</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return null
}

export default Error