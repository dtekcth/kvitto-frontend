import { useForm } from 'react-hook-form'
import { InputField } from '../components/InputField'

import { LoginDetails, loginUser } from '../auth/authReduce.tsx'
import { useAuthDispatch } from '../auth/authContext.tsx'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export interface LoginForm {
  username: string
  password: string
}

export const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<LoginForm>({})

  const dispatch = useAuthDispatch()

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('credentials')
    if (token) {
      setAuthenticated(true)
    }
  }, [])

  const handleLogin = async (formData: LoginForm) => {
    const payload: LoginDetails = {
      name: formData.username,
      password: formData.password,
    }
    try {
      await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
      setAuthenticated(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ margin: 'auto' }}>
      {authenticated ? <Navigate to="/admin" /> : null}

      <InputField
        name={'username'}
        label={'Username'}
        type={'text'}
        error={errors.username}
        register={register}
      />
      <InputField
        name={'password'}
        label={'Password'}
        type={'password'}
        error={errors.password}
        register={register}
      />
      <button onClick={handleSubmit(handleLogin)}>Login</button>
    </div>
  )
}
