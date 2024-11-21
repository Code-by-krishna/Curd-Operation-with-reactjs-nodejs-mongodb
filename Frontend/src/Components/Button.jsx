import React from 'react'

const Button = ({
    Type = 'button',
    Disabled = false,
    Label = ''
}) => {
  return (
    <div className='flex justify-center'>
        <button type={Type} className='mt-2 text-black border border-black px-3 py-1 rounded-md bg-red-400 font-semibold hover:bg-red-500' disabled={Disabled}>{Label}
        </button>
    </div>
  )
}

export default Button