import React from 'react'

const MACard = ({title , description}) => {
  return (
    <>
    <div style={{backgroundColor:'#0559ac'}} className="container w-50 text-white p-5 rounded shadow-lg mt-5 mb-5">
        <h2>Title: <span className='h4'>{title}</span></h2>
        <h2>Description: <span className='h5'>{description}</span></h2>
    </div>
    </>
  )
}

export default MACard