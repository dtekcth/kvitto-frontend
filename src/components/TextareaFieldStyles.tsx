import { css } from '@emotion/react'
import { FieldError } from 'react-hook-form'

export const textAreaCSS = (error: FieldError | undefined) => {
  return css({
    width: '100%',
    borderColor: error ? '#fa6607' : '',
  })
}
