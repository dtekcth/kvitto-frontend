// import { Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { addUser } from '../api/users'
import { Dropdown, DropdownOption } from '../components/Dropdown'
import { InputField } from '../components/InputField'

interface AddUser {
  email: string
  role: number
}

export const Users = (): JSX.Element => {
  const {
    register,
    control,
    setValue,
    handleSubmit,

    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<AddUser>()

  const onSubmit = async (formData: AddUser) => {
    await addUser(formData.email, formData.role)
  }

  const roleOptions: DropdownOption[] = [
    { label: 'Admin', value: 1 },
    { label: 'Trasurer', value: 2 },
    { label: 'Regular', value: 3 },
    { label: 'Auditer', value: 4 },
  ]
  return (
    <div>
      <InputField name="email" type="text" label="Email" register={register} />
      <Dropdown
        name="role"
        label="Choose a role"
        options={roleOptions}
        control={control}
        register={register}
        valueChange={(option: DropdownOption | null) => {
          option != null && setValue('role', option.value as number)
        }}
      ></Dropdown>
      <button onClick={handleSubmit(onSubmit)}>Add user</button>
    </div>
  )
}
