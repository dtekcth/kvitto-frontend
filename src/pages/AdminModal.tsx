import { ModalPopup } from '../components/ModalPopup'
import { PurchaseWithId } from '../api/purchases'
import Button from 'react-bootstrap/Button'

interface Props {
  purchase:PurchaseWithId,
  handleClose: () => void,
  show:boolean
}

export const AdminModal = ({
  purchase,
  handleClose,
  show
}:Props): JSX.Element => {

  const title = "Purchase " + purchase.id

  const body = <div> {purchase.id} </div>

  const footer = <div> 
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Toggle Handled
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Toggle Approved
    </Button>
  </div>

  return (
    <ModalPopup
      title={title}
      body={body}
      footer={footer}
      show={show}
      onHide={handleClose}/>
  )
}

