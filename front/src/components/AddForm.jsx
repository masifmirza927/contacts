import React from 'react'

const AddForm = () => {
    return (
        <div>
            <form onSubmit={ e => e.preventDefault() }>
                <input className='w-full py-2 px-2' type='text' placeholder='fruite name' />
                <br />
                <button className='bg-gray-300 px-6 py-2 mt-3 rounded-md hover:bg-gray-700 hover:text-white'>Add</button>
            </form>
        </div>
    )
}

export default AddForm