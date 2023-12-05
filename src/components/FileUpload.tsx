import { FieldError } from 'react-hook-form'
import { useRef } from 'react'
import { ErrorMessage, Label } from './styles'

interface Props {
  label: string
  placeholder?: string | number
  onChange?: (file: File) => void
  error: FieldError | undefined
  files: File[]
}

export const FileUpload = ({ label, onChange, error, files }: Props): JSX.Element => {
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
  return (
    <div key={files.length}>
      <Label>
        {label}
        <input style={{ "display": "none" }} ref={fileInput} type="file" onChange={fileUpload} />
        <button onClick={selectFile} className="btn btn-primary">
          Upload
        </button>
      </Label>
      {files.map((item, i) => {
        console.log(files)
        console.log("lold")
          return <label key={i}> {item.name} </label>
})}
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  )
}
