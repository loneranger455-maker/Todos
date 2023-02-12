import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { StoreToken } from './Localstorage'
import axios from 'axios'


function Error(props){
    return(
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium"></span>{props.error}
        </div>
      </div>
        )

}

function SignUp() {
    const navigate=useNavigate()
    const [errors,setError]=useState('')
  const handleFormSubmit=(e)=>{
e.preventDefault()
    const formdata=new FormData(e.target)
    axios.post('http://localhost:8000/signup/',formdata).then((resp)=>{
    console.log(resp)
    if(resp.data.errors){
      setError(resp.data.errors)
    }
    else{
      StoreToken(resp.data.token)
      navigate('/dashboard')
    }
  }
    )
    .catch((err)=>{
      console.log(err.response.data.errors)
      setError(err.response.data.errors)
    }
    )

}
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Create an account 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            name='email'
                            placeholder='Your Email'
                        />
                    </div>
                    {errors.email?<p className='text-red-700 text-xs font-light'>{errors.email}</p>:""}
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            name='username'
                            placeholder='Enter a username'
                        />
                                            {errors.username?<p className='text-red-700 text-xs font-light'>{errors.username}</p>:""}

                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Enter Password'
                        />
                                                                    {errors.password?<p className='text-red-700 text-xs  font-light'>{errors.password}</p>:""}

                    </div>
                    <div>
                        <label htmlFor='passwordconfirm'>Confirm Password</label>
                        <input
                            type='password'
                            name='passwordconfirm'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='passwordconfirm'
                            placeholder='confirm Password'
                        />
                                                                    {errors.passwordconfirm?<p className='text-red-700 text-xs font-light'>{errors.passwordconfirm}</p>:""}

                    </div>


                    <div className='flex  flex-col gap-6 justify-center items-center mt-6'>
                        <button
                            className={`bg-red-700 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            SignUp
                        </button>
                        <p className='text-gray-700'>Already have an account?<a href='/' className='text-blue-900'>login</a></p>
                    </div>
                </form>
                {errors.non_field_errors?<Error error={errors.non_field_errors}/>:""}
            </div>
        </div>
    );
};

export default SignUp;
     

