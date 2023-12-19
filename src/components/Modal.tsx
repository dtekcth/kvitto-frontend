import { ModalProps } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

interface Props extends ModalProps {
  title:String
  body:React.ReactNode
  footer:React.ReactNode
}

export const ModalPopup = ({
  title,
  body,
  footer,
  ...rest
}:Props): JSX.Element => {
  return (
    <Modal  {...rest}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  )
}

