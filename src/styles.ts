import styled from '@emotion/styled'

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
})

export const HEADER_HEIGHT = '80px'
export const PAGE_HEIGHT = `calc(100% - var(--nav-height))`
export const SMALL_SCREEN_LIMIT = '1000px'
export const SMALL_MEDIA_QUERY = `only screen and (max-width : ${SMALL_SCREEN_LIMIT})`
