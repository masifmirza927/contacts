import React, { useState } from 'react'

const Card = ({ fruits, addFruit }) => {
  const [name, setName] = useState("");

  const handleBtn = () => {
     addFruit(name);
  }
  return (
    <div className='p-5 border m-auto mb-10 rounded-md shadow-sm bg-slate-200 w-[300px]'>
      <div className=' border '>
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <input onChange={ (e) => setName(e.target.value) } className='w-full py-2 px-2' type='text' placeholder='fruite name' />
            <br />
            <button onClick={ handleBtn } className='bg-gray-300 px-6 py-2 mt-3 rounded-md hover:bg-gray-700 hover:text-white'>Add</button>
          </form>
        </div>
      </div>

      <div className='my-3 rounded p-3'>
        <ul>
          {
            fruits.map((fruit, index) => <li className='bg-gray-300 py-2 px-2 my-2' key={index}>{fruit}</li>)
          }
        </ul>
      </div>
      {/* <h1 className='text-xl mb-3'>Sample Card</h1> by <p>{name}</p>
        <p className='text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, eum.</p> */}
    </div>
  )
}

export default Card