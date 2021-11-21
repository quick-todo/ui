interface Props {
  children:React.ReactNode
}

function master(props: Props) {
  return <div className="layout-master" style={{backgroundColor: '#f2f6ff'}}>
    <div className="flex flex-col md:flex-row mx-auto container">
      <div className="bg-white lg:relative lg:h-screen lg:w-60 lg:fixed">
        <div className="content-center text-left justify-between mt-10 p-5 md:mt-12">
          <h3 className="font-medium">Filters</h3>
          <p>Link 1</p>
        </div>
      </div>
      <div className="main-content flex-1 bg-gray-100 mt-12 pb-24 p-3 md:mt-0 md:pb-0" style={{backgroundColor:'#F9FBFC'}}>
        <div className="max-w-screen-lg">
        {props.children}
        </div>
      </div>
    </div>
  </div>
}


export default master;