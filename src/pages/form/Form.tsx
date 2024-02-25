import { useForm } from 'react-hook-form'
import { InputField } from '../../components/input/InputField.tsx'
import { BudgetPost, getBudgetPostsById } from '../../api/budget-posts.tsx'
import {
  RadioButton,
  RadioButtonOption,
} from '../../components/radio-button/RadioButton.tsx'
import { useState, useEffect } from 'react'
import {
  Dropdown,
  DropdownOption,
} from '../../components/dropdown/Dropdown.tsx'

import { Datepicker } from '../../components/datepicker/Datepicker.tsx'
import { Textarea } from '../../components/text-area/TextareaField.tsx'
import { Committee, getCommittes } from '../../api/committes.tsx'
import { schema } from '../validationScheme.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormPurchase,
  ReceivedPurchase,
  postPurchases,
} from '../../api/purchases.tsx'
import { FileUpload } from '../../components/file-upload/FileUpload.tsx'

import {
  Page,
  FormDiv,
  MoneyDiv,
  Decimal,
  NumberMoney,
  UploadDiv,
  BankDiv,
  clearing,
  accountNumber,
  InputsDiv,
  FORM_PADDING,
  SmallImportant,
  BigImportant,
} from './FormStyling.ts'

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
  physical: number
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
  } = useForm<OurForm>({ resolver: yupResolver(schema) })

  const onSubmit = async (formData: OurForm) => {
    const dateString = formData.purchasedate.toISOString().split('T')[0]
    const purchase: FormPurchase = {
      description: formData.description,
      paymentType: formData.card,
      name: formData.name,
      phoneNr: formData.phone,
      clearing: formData.clearing,
      accountNumber: formData.account,
      isHandled: false,
      isApproved: false,
      crowns: formData.crowns,
      ore: formData.ore,
      purchaseDate: dateString,
      committeeId: formData.committee,
      budgetPostId: formData.budgetpost,
      files: uploadedFiles,
    }
    setFiles([])
    const result = await postPurchases(purchase)
    if (!(result instanceof Error)) {
      setShowForm(false)
      setSubmittedExpense(result)
      if (formData.physical === 1) {
        setPhysical(true)
      } else {
        setPhysical(false)
      }
    }
  }
  const [budgetpostsNames, setBudgetPost] = useState<DropdownOption[]>()
  const [committees, setCommittees] = useState<DropdownOption[]>()
  const [uploadedFiles, setFiles] = useState<File[]>([])
  const [showForm, setShowForm] = useState(true)
  const [submittedExpense, setSubmittedExpense] =
    useState<ReceivedPurchase | null>(null)
  const [physical, setPhysical] = useState(false)

  useEffect(() => {
    void getCommittes().then(result => {
      if (!(result instanceof Error)) {
        const temp: DropdownOption[] = []
        result.forEach((value: Committee) => {
          temp.push({ value: value.id, label: value.name })
        })
        setCommittees(temp)
      }
    })

    setBudgetPost([])
  }, [])

  const cardOptions: RadioButtonOption[] = [
    { value: 'private', label: 'Private card' },
    { value: 'committee', label: 'Comittee card' },
    { value: 'division', label: 'Divison card' },
  ]

  const fileUpload = (files: File[]): void => {
    setFiles(files)
  }

  const FormDivNoPadding = FormDiv('0px')
  const FormDivWithPadding = FormDiv(FORM_PADDING)

  const submittedPage = (
    <FormDivWithPadding>
      Your expense has successfully been submitted.<br></br>
      {physical ? (
        <div>
          As you have submitted a physical receipt, you{' '}
          <SmallImportant>must</SmallImportant> give that receipt to the
          division. In order to do this, go to the council room located in
          Idéläran with room number 2510. There is a paper where you can attach
          your receipt, and in the ID field of that paper fill in this number:
          <br></br>
          <BigImportant>
            {submittedExpense != null && submittedExpense.id}
          </BigImportant>
        </div>
      ) : (
        ''
      )}
      <button className="btn btn-primary" onClick={() => setShowForm(true)}>
        Create another expense
      </button>
    </FormDivWithPadding>
  )

  return (
    <Page>
      {showForm ? (
        <FormDivNoPadding>
          <InputsDiv>
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
              label="Which day did you do the purchase?"
              control={control}
              onChange={date => {
                date != null && setValue('purchasedate', date)
              }}
              register={register}
              error={errors.purchasedate}
              excludeFuture={true}
            />
            <MoneyDiv>
              <InputField
                css={NumberMoney}
                name="crowns"
                type="number"
                label="Swedish crowns"
                register={register}
                error={errors.crowns}
              />
              <Decimal>,</Decimal>
              <InputField
                css={NumberMoney}
                name="ore"
                type="number"
                label="Swedish ore"
                register={register}
                error={errors.ore}
              />
            </MoneyDiv>
            <BankDiv>
              <InputField
                css={clearing}
                name="clearing"
                type="text"
                label="Clearing"
                register={register}
                error={errors.clearing}
              />
              <InputField
                css={accountNumber}
                name="account"
                type="text"
                label="Account number"
                register={register}
                error={errors.account}
              />
            </BankDiv>

            <Dropdown
              name="committee"
              label="Which committee did the purchase?"
              options={committees}
              error={errors.committee}
              control={control}
              register={register}
              valueChange={async (option: DropdownOption | null) => {
                option != null && setValue('committee', option.value as number)
                const result = await getBudgetPostsById(option?.value as number)
                if (!(result instanceof Error)) {
                  const temp: DropdownOption[] = []
                  result.forEach((value: BudgetPost) => {
                    temp.push({ value: value.id, label: value.name })
                  })
                  setBudgetPost(temp)
                }
              }}
            />
            <Dropdown
              name="budgetpost"
              label="Choose a budgetpost"
              options={budgetpostsNames}
              error={errors.budgetpost}
              control={control}
              register={register}
              isDisabled={
                budgetpostsNames != null && budgetpostsNames.length > 0
                  ? false
                  : true
              }
              valueChange={(option: DropdownOption | null) => {
                option != null && setValue('budgetpost', option.value as number)
              }}
            />
            <UploadDiv>
              <FileUpload
                files={uploadedFiles}
                label={'Receipts'}
                error={undefined}
                onChange={fileUpload}
              />
            </UploadDiv>
            <RadioButton
              name="physical"
              label="Is the original receipt physical?"
              register={register}
              error={errors.physical}
              options={[
                { label: 'Yes', value: 1 },
                { label: 'No', value: 0 },
              ]}
            />
          </InputsDiv>
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </FormDivNoPadding>
      ) : (
        submittedPage
      )}
    </Page>
  )
}
