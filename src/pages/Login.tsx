import { useForm } from "react-hook-form"
import { InputField } from "../components/InputField"

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

      const onSubmit = (formData: LoginForm): void => {
        
      }

  return (
    <div style={{"margin": "auto"}}>
      <InputField name={"username"} label={"Username"} type={"text"} error={errors.username} register={register} />
      <InputField name={"password"} label={"Password"} type={"password"} error={errors.password} register={register} />
      <button onClick={handleSubmit(onSubmit)}>Login</button>

    </div>
  )
}
