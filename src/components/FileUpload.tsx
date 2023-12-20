import { FieldError } from 'react-hook-form'
import { useRef } from 'react'
import { ErrorMessage, Label } from './styles'
import { FileDiv, FileText, FilesDiv } from './FileUploadStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

interface Props {
  label: string
  placeholder?: string | number
  onChange?: (file: File) => void
  error: FieldError | undefined
  files: File[]
}

export const FileUpload = ({
  label,
  onChange,
  error,
  files,
}: Props): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null)
  const selectFile = (): void => {
    if (fileInput.current != null) {
      fileInput.current.click()
    }
  }

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target
    const selectedFiles = files as FileList

    if (onChange !== undefined) {
      onChange(selectedFiles?.[0])
    }
  }

  const openFile = (file: File) => {
    const fileURL = URL.createObjectURL(file)
    const pdfWindow = window.open()
    if (pdfWindow) {
      pdfWindow.location.href = fileURL
    }
  }

  return (
    <div key={files.length}>
      <Label>
        {label}
        <input
          style={{ display: 'none' }}
          ref={fileInput}
          type="file"
          onChange={fileUpload}
        />
        <button onClick={selectFile} className="btn btn-primary">
          Upload
        </button>
      </Label>
      {files.length > 0 ? 'Uploaded files' : ''}
      <FilesDiv>
        {files.map((item, i) => {
          console.log(item)
          return (
            <FileDiv key={i}>
              <FontAwesomeIcon icon={faFile} />
              <FileText
                onClick={() => {
                  openFile(item)
                }}
              >
                {' '}
                {item.name}{' '}
              </FileText>
            </FileDiv>
          )
        })}
      </FilesDiv>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  )
}
