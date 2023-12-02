import { Controller, useForm } from 'react-hook-form'
import { InputField } from './components/InputField'
import { BudgetPost, getBudgetPosts } from './api/budget-posts'
import Select from 'react-select'

import { RadioButton } from './components/RadioButton'
import { useState, useEffect } from 'react'

//  npm install @emotion/react @emotion/styled react-hook-form yup @hookform/resolvers @types/react
// example form type, should replicate the Request-object expected by api

// TODO: use fn+f2 to replace all occurances of the type-name when changed
// TODO: move the "OurForm" interface to a more resonable place were other types are stored.
// since it should be useable by e.g. api-calls etc
export interface OurForm {
  name: string
  cost: number
  phone: string
  card: string
  budgetposts: string
}
// TODO: sync api contract

// TODO: datepicker https://www.npmjs.com/package/react-datepicker
// relevant stackoverflow https://stackoverflow.com/questions/60864610/is-it-possible-to-use-react-datepicker-with-react-hooks-forms
export const Form = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },

    setValue,
    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<OurForm>({})

  const onSubmit = (formData: OurForm): void => {
    console.log(formData)
  }

  const [budgetpostsNames, setBudgetPost] = useState<BudgetPost[]>()

  useEffect(() => {
    void getBudgetPosts().then(result => {
      if (!(result instanceof Error)) {
        setBudgetPost(result)
      }
    })
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="name"
          type="text"
          label="First and last name"
          register={register}
          error={errors.name}
        />
        <InputField
          name="phone"
          type="text"
          label="Phonenumber"
          register={register}
          error={errors.phone}
        />
        <Controller
          name="budgetposts"
          control={control}
          render={({ field }) => {
            return (
              <Select
                getOptionLabel={(vehicle: BudgetPost) => vehicle.name}
                getOptionValue={(vehicle: BudgetPost) => vehicle.name}
                options={budgetpostsNames}
                onChange={(option: BudgetPost | null) => {
                  option != null && setValue('budgetposts', option.name)
                }}
              />
            )
          }}
        />
        <RadioButton
          name="card"
          label="What type of card did you use for the purchase?"
          register={register}
          error={errors.card}
          options={[]}
        />
        <InputField
          name="cost"
          type="number"
          label="Den totala kostnaden"
          register={register}
          error={errors.cost}
        />
        <input type="submit" />
      </form>
    </div>
  )
}
