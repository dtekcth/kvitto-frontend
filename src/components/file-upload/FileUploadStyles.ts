import styled from '@emotion/styled'

export const FilesDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const FileDiv = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
})

export const FileText = styled.a`
  color: #0000ee;
  &:hover {
    cursor: pointer;
  }
`
