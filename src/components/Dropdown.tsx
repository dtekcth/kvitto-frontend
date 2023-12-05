import {
  UseFormRegister,
  FieldError,
  Controller,
  Control,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
// import styled from '@emotion/styled'
import { ErrorMessage, Label } from './styles'
import Select, { ActionMeta, SingleValue } from 'react-select'

export interface DropdownOption {
  value: string | number
  label: string
}

interface Props<Form extends FieldValues> {
  name: FieldPath<Form>
  label: string
  placeholder?: string | number
  options: DropdownOption[] | undefined
  error: FieldError | undefined
  control: Control<Form, any>
  onChange: (
    newValue: SingleValue<DropdownOption>,
    actionMeta: ActionMeta<DropdownOption>,
  ) => void
  register: UseFormRegister<Form>
}

export const Dropdown = <Form extends FieldValues>({
  name,
  label,
  options,
  control,
  onChange,
  error,
}: Props<Form>): JSX.Element => {
  if (options != null) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Label>{label}</Label>

              <Select
                getOptionLabel={(item: DropdownOption) => item.label}
                getOptionValue={(item: DropdownOption) => item.value as string}
                options={options}
                onChange={(option: any | null, actionMeta) => {
                  onChange(option, actionMeta)
                }}
              />
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )
        }}
      />
    )
  }

  return <></>
}
