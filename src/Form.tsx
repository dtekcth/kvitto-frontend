import { useForm } from 'react-hook-form'
import { InputField } from './components/InputField'
import { BudgetPost, getBudgetPosts } from './api/budget-posts'
import { RadioButton, RadioButtonOption } from './components/RadioButton'
import { useState, useEffect } from 'react'
import { Dropdown, DropdownOption } from './components/Dropdown'

import 'react-datepicker/dist/react-datepicker.css'
import { Datepicker } from './components/Datepicker'
import { Textarea } from './components/TextareaField'
import { Committee, getCommittes } from './api/committes'
// import { schema } from './validationScheme'
// import { yupResolver } from '@hookform/resolvers/yup'
import { Purchase, postPurchases } from './api/purchases'

//  npm install @emotion/react @emotion/styled react-hook-form yup @hookform/resolvers @types/react
// example form type, should replicate the Request-object expected by api

// TODO: use fn+f2 to replace all occurances of the type-name when changed
// TODO: move the "OurForm" interface to a more resonable place were other types are stored.
// since it should be useable by e.g. api-calls etc
export interface OurForm {
  name: string
  crowns: number
  ore: number
  phone: string
  card: string
  budgetpost: number
  purchasedate: Date
  description: string
  committee: number
  account: string
  clearing: string
  file: string
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
    const purchase: Purchase = {
      description: 'Test',
      paymentType: 'division',
      name: 'Simon Johansson',
      phoneNr: '12345',
      clearing: '1234',
      accountNumber: '1234567',
      isHandled: false,
      isApproved: false,
      crowns: 100,
      ore: 0,
      purchaseDate: '2023-12-12',
      committeeId: 0,
      budgetPostId: 0,
      files: uploadedFiles ?? []
    }
    console.log(postPurchases(purchase))
  }

  const [budgetpostsNames, setBudgetPost] = useState<DropdownOption[]>()
  const [committees, setCommittees] = useState<DropdownOption[]>()
  const [uploadedFiles, setFiles] = useState<File[]>()

  useEffect(() => {
    void getBudgetPosts().then(result => {
      if (!(result instanceof Error)) {
        const temp: DropdownOption[] = []
        result.forEach((value: BudgetPost, number: number) => {
          temp.push({ value: value.Id, label: value.Name })
        })
        setBudgetPost(temp)
      }
    })
  }, [])

  useEffect(() => {
    void getCommittes().then(result => {
      if (!(result instanceof Error)) {
        const temp: DropdownOption[] = []
        result.forEach((value: Committee, number: number) => {
          temp.push({ value: value.Id, label: value.Name })
        })
        setCommittees(temp)
      }
    })
  }, [])

  const cardOptions: RadioButtonOption[] = [
    { value: 'private', label: 'Private card' },
    { value: 'comittee', label: 'Comittee card' },
    { value: 'divison', label: 'Divison card' },
  ]

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target
    const selectedFiles = files as FileList
    const temp: File[] = uploadedFiles ?? []
    temp.push(selectedFiles?.[0])
    setFiles(temp)
    console.log(uploadedFiles)
  };

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
          type="textarea"
          label="Phonenumber"
          register={register}
          error={errors.phone}
        />
        <RadioButton
          name="card"
          label="What type of card did you use for the purchase?"
          register={register}
          error={errors.card}
          options={cardOptions}
        />
        <Textarea
          name="description"
          label="Description"
          register={register}
          error={errors.description}
        />
        <Datepicker
          name="purchasedate"
          label="Choose a date"
          control={control}
          onChange={date => {
            console.log(date?.toJSON())
            date != null && setValue('purchasedate', date)
          }}
          register={register}
          error={errors.purchasedate}
        />
        <Dropdown
          name="budgetpost"
          label="Choose a budgetpost"
          options={budgetpostsNames}
          error={errors.budgetpost}
          control={control}
          register={register}
          onChange={(option: DropdownOption | null) => {
            option != null && setValue('budgetpost', option.value as number)
          }}
        />

        <InputField
          name="crowns"
          type="number"
          label="Swedish crowns"
          register={register}
          error={errors.crowns}
        />
        <InputField
          name="ore"
          type="number"
          label="Swedish ore"
          register={register}
          error={errors.ore}
        />

        <InputField
          name="account"
          type="text"
          label="Account number"
          register={register}
          error={errors.account}
        />

        <InputField
          name="clearing"
          type="text"
          label="Clearing number"
          register={register}
          error={errors.account}
        />

        <Dropdown
          name="committee"
          label="Comittees"
          options={committees}
          error={errors.committee}
          control={control}
          register={register}
          onChange={(option: DropdownOption | null) => {
            option != null && setValue('committee', option.value as number)
          }}
        />

        <InputField
          name="file"
          type="file"
          label="Upload a receipt"
          register={register}
          error={errors.file}
          onChange={fileUpload}
        />
        <input type="submit" />
      </form>
    </div>
  )
}
