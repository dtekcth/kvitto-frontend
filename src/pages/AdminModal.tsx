import { ModalPopup } from '../components/ModalPopup'
import { ReceivedPurchase } from '../api/purchases'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../components/InputField'
//import Input from 'react-select/dist/declarations/src/components/Input'
import { BudgetPost, getBudgetPosts } from '../api/budget-posts'
import { RadioButton, RadioButtonOption } from '../components/RadioButton'
import { Dropdown, DropdownOption } from '../components/Dropdown'
import 'react-datepicker/dist/react-datepicker.css'
import { Datepicker } from '../components/Datepicker'
import { Textarea } from '../components/TextareaField'
import { Committee, getCommittes } from '../api/committes'
import { FormPurchase, postPurchases } from '../api/purchases'
//import { FileUpload } from '../components/FileUpload'

interface Props {
  purchase: ReceivedPurchase
  handleClose: () => void
  show: boolean
}

export const AdminModal = ({
  purchase,
  handleClose,
  show,
}: Props): JSX.Element => {
  const toggleHandled = () => {}

  const toggleApproved = () => {}

  //Edit mode of modal--------------------------
  const [editState, setEditState] = useState(false)

  const editModal = () => {
    setEditState(true)
  }

  const defaultValues = {
    name: purchase.name,
    crowns: purchase.crowns,
    ore: purchase.ore,
    phone: purchase.phoneNr,
    card: purchase.paymentType,
    description: purchase.description,
    purchasedate: new Date(purchase.purchaseDate),
    budgetpost: {
      value: purchase.budgetPost.id,
      label: purchase.budgetPost.name,
    },
    account: purchase.accountNumber,
    clearing: purchase.clearing,
    committee: {
      value: purchase.committee.id,
      label: purchase.committee.name,
    },
  }

  console.log(new Date(purchase.purchaseDate.split('T')[0]))

  interface OurForm {
    name: string
    crowns: number
    ore: number
    phone: string
    card: string
    budgetpost: DropdownOption
    purchasedate: Date
    description: string
    committee: DropdownOption
    account: string
    clearing: string
    file: string
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },

    setValue,
    reset,
    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<OurForm>({
    /* defaultValues: {
      name: purchase.name,
      crowns: purchase.crowns,
      ore: purchase.ore,
      phone: purchase.phoneNr,
      card: purchase.paymentType,
      description: purchase.description,
      purchasedate: undefined, //new Date(purchase.purchaseDate.split('T')[0]),
      budgetpost: purchase.budgetPost.id,
      account: purchase.accountNumber,
      clearing: purchase.clearing,
      committee: purchase.committee.id,
    }, */
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  })

  const onUpdate = (formData: OurForm): void => {
    console.log(formData)
    const dateString = formData.purchasedate.toISOString().split('T')[0]

    const committeeId = formData.committee.value as number
    const budgetPostId = formData.budgetpost.value as number
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
      committeeId: committeeId,
      budgetPostId: budgetPostId,
      files: uploadedFiles,
    }
    setFiles([])
    console.log(postPurchases(purchase))
  }

  const cardOptions: RadioButtonOption[] = [
    { value: 'private', label: 'Private card' },
    { value: 'committee', label: 'Comittee card' },
    { value: 'division', label: 'Divison card' },
  ]

  const [budgetpostsNames, setBudgetPost] = useState<DropdownOption[]>()
  const [committees, setCommittees] = useState<DropdownOption[]>()
  const [uploadedFiles, setFiles] = useState<File[]>([])

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

    void getBudgetPosts().then(result => {
      if (!(result instanceof Error)) {
        const temp: DropdownOption[] = []
        result.forEach((value: BudgetPost) => {
          temp.push({ value: value.id, label: value.name })
        })
        setBudgetPost(temp)
      }
    })
  }, [])

  /* useEffect(() => {
    let defaultValues: {
      name: purchase.name,
      crowns: purchase.crowns,
      ore: purchase.ore,
      phone: purchase.phoneNr,
      card: purchase.paymentType,
      description: purchase.description,
      purchasedate: new Date(purchase.purchaseDate),
      budgetpost: purchase.budgetPost.id,
      account: purchase.accountNumber,
      clearing: purchase.clearing,
      committee: purchase.committee.id,
    }
    reset({ ...defaultValues });
  }, []); */
  useEffect(() => reset({ ...defaultValues }), [purchase])

  //---------------------------------------------

  //A local version of close function -----------

  const localClose = () => {
    handleClose()
    setEditState(false)
  }

  //---------------------------------------------

  //Defining modal title, body and footer and checks if in edit mode or not

  const title = 'Purchase ' + purchase.id

  let body = <div> </div>

  if (!editState) {
    body = (
      <div>
        <div>ID: {purchase.id}</div>
        <div>Name: {purchase.name}</div>
        <div>
          Amount: {purchase.crowns},{purchase.ore}
        </div>
        <div>Phone: {purchase.phoneNr}</div>
        <div>
          Account: {purchase.clearing} - {purchase.accountNumber}
        </div>
        <div>Payment Type: {purchase.paymentType}</div>
        <div>Purchase Date: {purchase.purchaseDate}</div>
        <div>Description: {purchase.description}</div>
        <div>Is Handled: {purchase.isHandled.toString()}</div>
        <div>Is Approved: {purchase.isApproved.toString()}</div>
        <div>Committee: {purchase.committee.name}</div>
        <div>Budget Post: {purchase.budgetPost.name}</div>
        <div>Budget Post Id: {purchase.budgetPost.id}</div>
      </div>
    )
  } else {
    body = (
      <div>
        <div>
          <InputField
            name="name"
            type="text"
            label="Name"
            defaultValue={purchase.name}
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
            label="Payment type"
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
            label="Purchase date"
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
            label="Budgetpost"
            options={budgetpostsNames}
            error={undefined}
            control={control}
            register={register}
            defaultValue={defaultValues.budgetpost}
            valueChange={() => {}}
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
            error={undefined}
            control={control}
            register={register}
            defaultValue={defaultValues.committee}
            valueChange={() => {}}
          />
          <button onClick={handleSubmit(onUpdate)}>Submit</button>
        </div>
      </div>
    )
  }

  let footer = <div> </div>

  if (!editState) {
    footer = (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          width: '100%',
        }}
      >
        <div style={{ justifySelf: 'left' }}>
          <Button variant="primary" onClick={toggleHandled}>
            Toggle Handled
          </Button>
          <Button variant="primary" onClick={toggleApproved}>
            Toggle Approved
          </Button>
        </div>
        <div style={{ justifySelf: 'right' }}>
          <Button variant="secondary" onClick={localClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={editModal}>
            Edit
          </Button>
        </div>
      </div>
    )
  } else {
    footer = (
      <div style={{ display: 'grid', width: '100%' }}>
        <div style={{ justifySelf: 'right' }}>
          <Button variant="secondary" onClick={localClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={localClose}>
            Update
          </Button>
        </div>
      </div>
    )
  }

  //---------------------------------------------------------

  return (
    <ModalPopup
      title={title}
      body={body}
      footer={footer}
      show={show}
      onHide={localClose}
    />
  )
}
