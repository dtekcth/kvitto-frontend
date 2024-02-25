import styled from '@emotion/styled'
import { HEADER_HEIGHT } from '../../styles'

export const Logo = styled.img({
  height: '50px',
})

const PROFILE_HEIGHT = `calc(${HEADER_HEIGHT} - 20px)`

export const HeaderDiv = {
  height: HEADER_HEIGHT,
  width: '100%',
  border: '5px black',
  borderStyle: 'solid',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const LeftHandSide = styled.div({
  marginRight: '1%',
  display: 'flex',
  gap: '10px',
})

export const ProfilePic = styled.img({
  height: PROFILE_HEIGHT,
  borderRadius: '50%',
})

export const TitleH1 = styled.h1({
  marginLeft: '1%',
  display: 'flex',
  gap: '10px',
})

export const AdminButton = styled.button({})
