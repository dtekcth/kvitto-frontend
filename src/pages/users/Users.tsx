// import { Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { addUser, getAllUsers, getRoles } from '../../api/users'
import { Dropdown, DropdownOption } from '../../components/dropdown/Dropdown'
import { InputField } from '../../components/input/InputField'
import { useEffect, useState } from 'react'

interface AddUser {
  email: string
  role: number
}

interface User {
  google_id: number
  id: number
  email: string
  role_id: number
  pending: boolean
}

export const Users = (): JSX.Element => {
  const {
    register,
    control,
    setValue,
    handleSubmit,

    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<AddUser>()

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getRoles().then((result): void => {
      if (result instanceof Error) {
      } else {
        console.log(result)
      }
    })

    getAllUsers().then((result): void => {
      if (result instanceof Error) {
      } else {
        console.log(result)
        setUsers(result.data.users)
      }
    })
  }, [])

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
      {users.map(val => {
        return <div key={val.email}>{val.email}</div>
      })}
    </div>
  )
}
