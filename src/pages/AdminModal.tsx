import { ModalPopup } from '../components/ModalPopup'
import { ReceivedPurchase } from '../api/purchases'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

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
    body = <div>In edit mode</div>
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
