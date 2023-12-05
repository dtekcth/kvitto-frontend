import {
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import styled from '@emotion/styled'
import { HTMLInputTypeAttribute } from 'react'
import { ErrorMessage, Label } from './styles'

interface Props<Form extends FieldValues> {
  name: FieldPath<Form> // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  type: HTMLInputTypeAttribute
  error: FieldError | undefined
  register: UseFormRegister<Form>
}

export const InputField = <Form extends FieldValues>({
  name,
  type,
  label,
  onChange,
  register,
  error,
}: Props<Form>): JSX.Element => {
  // TODO: extract
  const Input = styled.input`
    ${error != null &&
    `
  border-color: #fa6607;
  `}
  `

  return (
    <div>
      <Label>
        {label}
        <Input
          type={type}
          {...register(name, {
            onChange,
          })}
        ></Input>
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    </div>
  )
}