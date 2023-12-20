import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Page = styled.div({
  'background-color': '#fa6607',
  width: '100%',
  height: '100%',
  paddingTop: '20px',
})

export const FormDiv = styled.div({
  margin: 'auto',
  width: '40%',
  'background-color': 'white',
  border: '2px solid #000',
  padding: '20px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const MoneyDiv = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
})

export const NumberMoney = css({
  width: '45%',
})

export const Decimal = styled.div({
  position: 'absolute',
  bottom: 10,
  left: '50%',
})

export const UploadDiv = styled.div({
  marginTop: '10px',
  marginBottom: '10px',
})

export const BankDiv = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
})

export const clearing = css({
  width: '20%',
})

export const accountNumber = css({
  width: '75%',
})
