interface Props {
  text: string
}

function Divider(props: Props) {
  return <div className="flex flex-row items-center justify-center py-4">
    <span className="h-px w-full bg-gray-300 rounded-full mx-2"></span>
    <span className="text-gray-400">{props.text}</span>        
    <span className="h-px w-full bg-gray-300 rounded-full mx-2"></span>
  </div>
}

export default Divider