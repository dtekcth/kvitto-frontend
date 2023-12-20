/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css } from '@emotion/react'
import {
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import styled from '@emotion/styled'
import { HTMLInputTypeAttribute } from 'react'
import { ErrorMessage, Label } from './styles'
import './InputField.scss'
import { SerializedStyles } from '@emotion/react'

interface Props<Form extends FieldValues> {
  name: FieldPath<Form> // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  type: HTMLInputTypeAttribute
  error: FieldError | undefined
  register: UseFormRegister<Form>
  css?: SerializedStyles
}

export const InputField = <Form extends FieldValues>({
  name,
  type,
  label,
  onChange,
  register,
  error,
  css,
}: Props<Form>): JSX.Element => {
  // TODO: extract
  const Input = styled.input`
    ${error != null &&
    `
  border-color: #fa6607;
  `}
  `

  return (
    <div css={css}>
      <Label>
        {label}
        <Input
          className="input"
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
