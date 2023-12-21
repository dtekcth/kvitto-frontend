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
  options?: DropdownOption[]
  error?: FieldError
  defaultValue?: DropdownOption
  control: Control<Form, unknown>
  valueChange: (
    newValue: SingleValue<DropdownOption>,
    actionMeta: ActionMeta<DropdownOption>,
  ) => void
  register: UseFormRegister<Form>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export const Dropdown = <Form extends FieldValues>({
  name,
  label,
  options,
  control,
  error,
  valueChange,
  defaultValue,
  ...rest
}: Props<Form>): JSX.Element => {
  if (options != null) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name, ref } }) => {
          return (
            <>
              <Label>{label}</Label>

              <Select
                {...rest}
                getOptionLabel={(item: DropdownOption) => item.label}
                getOptionValue={(item: DropdownOption) => item.value as string}
                options={options}
                value={options.find(c => c.value === value)}
                onChange={(val, e) => {
                  val != null && onChange(val.value)
                  valueChange(val, e)
                }}
                defaultValue={defaultValue}
                name={name}
                ref={ref}
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
