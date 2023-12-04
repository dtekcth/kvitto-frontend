import { FieldError } from 'react-hook-form'
import { useRef, useState } from 'react'
import { ErrorMessage, Label } from './styles'

interface Props {
  label: string
  placeholder?: string | number
  onChange?: (files: File[]) => void
  error: FieldError | undefined
}

export const FileUpload = ({ label, onChange, error }: Props): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null)
  const selectFile = (): void => {
    if (fileInput.current != null) {
      fileInput.current.click()
    }
  }

  const [uploadedFiles, setFiles] = useState<File[]>([])

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target
    const selectedFiles = files as FileList

    const temp: File[] = uploadedFiles
    temp.push(selectedFiles?.[0])
    setFiles(temp)
    console.log(uploadedFiles)

    if (onChange !== undefined) {
      onChange(uploadedFiles)
    }
  }
  return (
    <>
      <Label>
        {label}
        <input ref={fileInput} type="file" onChange={fileUpload} />
        <button onClick={selectFile} className="btn btn-primary">
          Upload
        </button>
      </Label>
      {uploadedFiles.forEach((item, i) => (
        <div key={i}>{item.name}</div>
      ))}
      <ErrorMessage>{error?.message}</ErrorMessage>
    </>
  )
}
