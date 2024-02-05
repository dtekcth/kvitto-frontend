/** @jsxImportSource @emotion/react */

import {
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import { HTMLInputTypeAttribute } from 'react'
import { ErrorMessage, Label } from './styles'
import { SerializedStyles } from '@emotion/react'
import { inputCSS } from './InputFieldStyles'

interface Props<Form extends FieldValues> {
  name: FieldPath<Form> // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  type: HTMLInputTypeAttribute
  error?: FieldError
  register: UseFormRegister<Form>
  css?: SerializedStyles
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
  defaultValue?: string
}

export const InputField = <Form extends FieldValues>({
  name,
  type,
  label,
  onChange,
  register,
  error,
  css,
  onKeyPress,
}: Props<Form>): JSX.Element => {
  // TODO: extract

  return (
    <div css={css}>
      <Label>
        {label}
        <input
          css={inputCSS(error)}
          onKeyDown={onKeyPress}
          className="input"
          type={type}
          {...register(name, {
            onChange,
          })}
        ></input>
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    </div>
  )
}
