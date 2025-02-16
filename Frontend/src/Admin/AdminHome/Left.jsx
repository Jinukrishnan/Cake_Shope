import React from 'react'

const Left = ({setComp}) => {

  const handleClick=(e)=>{
    // console.log(e.target.id);
    setComp(e.target.id)
  }
  return (
    <div>
      <h1 className='py-3'>Logo</h1>
  <ul className="list-group list-group-flush bg-light">
  <li className="list-group-item " onClick={handleClick} id='dashboard'>Dash Board</li>
  <li className="list-group-item " onClick={handleClick} id='restaurants'>Restaurants</li>
  <li className="list-group-item " onClick={handleClick} id='tables'>Tables</li>
</ul>
    </div>
  )
}

export default Left
