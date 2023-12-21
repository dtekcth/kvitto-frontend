import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PAGE_HEIGHT } from '../styles'

export const FORM_PADDING = '30px'

export const Page = styled.div`
  background-color: #fa6607;
  width: 100%;
  height: ${PAGE_HEIGHT};
  padding: ${FORM_PADDING};
`

export const FormDiv = (padding: string) => {
  return styled.div`
    margin: auto;
    overflow: auto;
    width: 50%;
    max-height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 5px solid black;
    border-radius: 20px;
    @media (max-width: 1000px) {
      width: 100%;
    }
    padding: ${padding};
  `
}

export const SmallImportant = styled.b`
  color: red;
`

export const BigImportant = styled.b`
  color: red;
  font-size: 48px;
  maring: 5px;
`

export const InputsDiv = styled.div`
  padding-top: ${FORM_PADDING};
  padding-left: ${FORM_PADDING};
  padding-right: ${FORM_PADDING};
`

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
