import { useForm } from 'react-hook-form'
import { InputField } from '../components/InputField'

import { LoginDetails, loginUser } from '../auth/reduce-auth.tsx'
import { useAuthDispatch } from '../auth/reduce-context.tsx'

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

  const handleLogin = async (formData: LoginForm) => {
    const payload: LoginDetails = {
      name: formData.username,
      password: formData.password,
      error: undefined,
    }
    try {
      const response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  /*
  const onSubmit = (formData: LoginForm): void => {
    console.log('t')
    getLogin(formData.username, formData.password)
      .then(async result => {
        if (result instanceof Error || result.status !== 200) {
        } else {
          console.log('h')

          console.log('a')
          const encodedStr = Buffer.from(
            formData.username + ':' + formData.password,
            'binary',
          ).toString('base64')

          console.log('setting creds')
          localStorage.setItem('credentials', encodedStr)
        }
      })
      .catch(async () => {})
  }
  */

  return (
    <div style={{ margin: 'auto' }}>
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
