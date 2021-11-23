import Sidebar from 'components/layout/Sidebar'
interface Props {
  children: React.ReactNode
}

function Master(props: Props) {
  return <div className="layout-master" style={{backgroundColor: '#f2f6ff'}}>
    <div className="flex flex-row mx-auto">
      <div className="bg-white md:w-48 lg:h-screen lg:w-60 lg:fixed break-words">
        <div className="content-center text-left justify-between mt-10 p-5 md:mt-12">
          <Sidebar />
        </div>
      </div>
      <div className="main-content lg:ml-60 flex-1 mt-12 pb-24 p-3 md:mt-0 md:pb-0" style={{backgroundColor:'#f4f4f6'}}>
        <div className="max-w-screen-lg m-auto relative">
        {props.children}
        </div>
      </div>
    </div>
  </div>
}


export default Master