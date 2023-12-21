import { FieldError } from 'react-hook-form'
import { useReducer, useRef, useState } from 'react'
import { ErrorMessage, Label } from './styles'
import { FileDiv, FileText, FilesDiv } from './FileUploadStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faX } from '@fortawesome/free-solid-svg-icons'

interface Props {
  label: string
  placeholder?: string | number
  onChange?: (files: File[]) => void
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

  const [uploadedFiles, setUploadedFiles] = useState(files)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target
    const selectedFiles = files as FileList
    const temp = uploadedFiles
    temp.push(selectedFiles?.[0])
    setUploadedFiles(temp)
    if (onChange !== undefined) {
      onChange(temp)
    }
    forceUpdate()
  }

  const openFile = (file: File) => {
    const fileURL = URL.createObjectURL(file)
    const pdfWindow = window.open()
    if (pdfWindow) {
      pdfWindow.location.href = fileURL
    }
  }

  return (
    <div key={uploadedFiles.length}>
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
      {uploadedFiles.length > 0 ? 'Uploaded files' : ''}
      <FilesDiv>
        {uploadedFiles.map((item, i) => {
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
              <FontAwesomeIcon
                onClick={() => {
                  const temp = uploadedFiles
                  delete temp[i]
                  const temp2: File[] = []
                  temp.map(value => {
                    value != null && temp2.push(value)
                  })
                  setUploadedFiles(temp2)
                  forceUpdate()
                }}
                icon={faX}
              />
            </FileDiv>
          )
        })}
      </FilesDiv>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  )
}
