import { UseFormRegister, FieldError } from 'react-hook-form'
import styled from '@emotion/styled'
import { OurForm } from '../Form'
import { ErrorMessage, Label } from './styles'

interface Props {
  name: keyof OurForm // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  options: string[] | undefined
  error: FieldError | undefined
  register: UseFormRegister<OurForm>
}

export const RadioButton = ({
  name,
  label,
  options,
  register,
  error,
}: Props): JSX.Element => {
  const Input = styled.input`
    ${error != null && `border-color: #fa6607;`}
  `

  if (options != null) {
    return (
      <Label>
        {label}
        {options.map((item, i) => (
          <label key={i}>
            <Input type="radio" value={item} {...register(name)} />
            {item}
          </label>
        ))}
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    )
  }

  return <></>
}
