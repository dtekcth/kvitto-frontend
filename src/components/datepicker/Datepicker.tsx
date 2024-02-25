/** @jsxImportSource @emotion/react */

import {
  UseFormRegister,
  FieldError,
  Controller,
  Control,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
// import styled from '@emotion/styled'
import { ErrorMessage, Label } from '../styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { datepicker } from './DatepickerStyles'

export interface DropdownOption {
  value: string
  label: string
}

interface Props<Form extends FieldValues> {
  name: FieldPath<Form>
  label: string
  placeholder?: string
  error?: FieldError
  control: Control<Form, unknown>
  excludeFuture?: boolean
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<unknown, Event> | undefined,
  ) => void
  register: UseFormRegister<Form>
}

export const Datepicker = <Form extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  onChange,
  error,
  excludeFuture = false,
}: Props<Form>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Label>{label}</Label>
          <DatePicker
            css={datepicker}
            placeholderText={placeholder}
            onChange={(date, event) => {
              onChange(date, event)
            }}
            selected={field.value}
            dateFormat="dd/MM - yyyy"
            calendarStartDay={1}
            shouldCloseOnSelect={true}
            filterDate={date => {
              if (excludeFuture) {
                return new Date() > date
              }
              return true
            }}
          />
          <ErrorMessage>{error?.message}</ErrorMessage>
        </>
      )}
    />
  )
}
