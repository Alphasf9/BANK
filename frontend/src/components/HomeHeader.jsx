import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeHeader = () => {

  const navigate = useNavigate();

  return (
    <div className='w-screen h-[350px] bg-[url(https://static.vecteezy.com/system/resources/previews/008/195/226/non_2x/abstract-elegant-white-and-gray-background-abstract-white-pattern-squares-texture-vector.jpg)] flex justify-around'>
        <div className='flex flex-col items-start mt-16 gap-10'>
            <h1 className='text-5xl font-extrabold text-blue-500'>Start Banking With Us!</h1>
            <p className='text-3xl'>Open a savings account today.</p>
            <button onClick={()=>navigate('/register')} className='mt-8 bg-blue-500 w-36 h-10 rounded text-white cursor-pointer'>Open Account</button>
        </div>

        <div>
            <img src="https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-open-bank-account-online-isolated-cartoon-vector-illustrations-png-image_6332466.png" alt="" />
        </div>
    </div>
  )
}

export default HomeHeader