import React from 'react'

const Input = (
    {
        Label = '',
        Id = '',
        Type = '',
        Placeholder = '',
        Name = '',
        Value = '',
        onChange = () => {},
    }
) => {
  return (
    <div>
        <label htmlFor={Id} className='mb-1 '>{Label}</label><br />
        <input type={Type} id={Id} value={Value} name={Name} placeholder={Placeholder} className=' w-[110%] rounded-sm h-7' onChange={onChange}/>
    </div>
  )
}

export default Input