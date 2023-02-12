import React, { useEffect, useState } from 'react'
import { GetToken } from './Localstorage'
import axios from 'axios'
import {MdDeleteForever} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
import {TbLogout} from 'react-icons/tb'
import { DeleteToken } from './Localstorage'
import { useNavigate } from 'react-router'

function ActivityManager() {
  const {access}=GetToken()
  const [todos,setTodos]=useState([])
  const [user,setUser]=useState("")
  const [inputtodo,setInputtodo]=useState("")
  const navigate=useNavigate()
    const logout=()=>{
        DeleteToken()
        navigate('/')

    }
  const handleSubmit=(e)=>{
  

e.preventDefault()
    const formdata=new FormData(e.target)
    axios.post('http://localhost:8000/tododata/',formdata,{"headers":{"authorization":`Bearer ${access}`

    }}).then((resp)=>{
    
    setTodos(resp.data)
    setInputtodo("")
  }
    )
    .catch((err)=>{
      console.log(err)
    }
    )

  }

  const deletetodo=(id)=>{
    axios.delete(`http://localhost:8000/tododata/${id}`,{"headers":{"authorization":`Bearer ${access}`

    }}).then((resp)=>{
    
    setTodos(resp.data)
    setInputtodo("")

  }
    ).catch((err)=>{
      console.log(err)
    }
    )

  }
  useEffect(()=>{
    axios.get('http://localhost:8000/tododata/',{"headers":{"authorization":`Bearer ${access}`}}).then((response)=>{
    setTodos(response.data.data)
      setUser(response.data.username)

    }).catch((err)=>console.log(err))

  },[])

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='relative w-[50rem] flex flex-col text-center bg-slate-300 shadow-lg rounded-lg h-4/5'>
        
        <div className='m-6'>
            <p className='font-extrabold text-2xl  '>Stu-Do</p>
            <p className='font-md'>Just do it </p>
            <div className='absolute right-5 top-8 flex gap-6'>
              <div className='flex gap-2 bg-gray-200 rounded-2xl p-1 px-4'><p className='text-xl'><FaUserAlt/></p><p>{user}</p></div>
          <p className='text-2xl font-extrabold' onClick={logout}><TbLogout/></p>
        </div>
        </div>
       
        <div className='w-[50rem] text-center'>
        <form onSubmit={handleSubmit} className='flex gap-6 ml-[10rem]'>
            <input type='text' name='data' value={inputtodo} placeholder='Enter a todo activity'
            onChange={e=>setInputtodo(e.target.value)}
            className='w-[25rem] p-2 rounded-lg px-4 border-2 border-gray-300'/>
            <input type='submit' className='bg-blue-600 text-white px-4 rounded-lg ' value='Add Todo'/>
                
        </form>
        </div>
        <div className='flex flex-col gap-4 mt-10 items-center overflow-auto'>
           {todos.length>0?todos.map((todos,key)=>(
            <div key={key} className='w-[30rem] relative bg-gray-200  p-2 rounded shadow-xl flex'>
              <p>{todos.data}</p>
              <button className='absolute right-4 text-red-700 hover:text-red-900' onClick={()=>deletetodo(todos.id)}><MdDeleteForever/></button>
            </div>
           )):<p className='font-light text-gray-800 text-sm'>No todos to shows</p>}
        </div>
        </div>
    </div>
  )
}

export default ActivityManager