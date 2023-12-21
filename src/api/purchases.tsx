import axios from 'axios'
import { API_ADDRESS } from '../Variables'

export interface Purchase {
  description: string
  paymentType: string
  name: string
  phoneNr: string
  clearing: string
  accountNumber: string
  isHandled: boolean
  isApproved: boolean
  crowns: number
  ore: number
  purchaseDate: string
  committeeId: number
  budgetPostId: number
  files: File[]
}

export interface PurchaseWithId extends Purchase {
  id: number
}

export interface PaginatedPurchases {
  numberOfPurchases: number
  purchases: PurchaseWithId[]
}

export async function postPurchases(
  object: Purchase,
): Promise<PurchaseWithId | Error> {
  const cred = localStorage.getItem('credentials')
  console.log('Creds: ' + cred)
  return await axios
    .post(API_ADDRESS + '/purchases', object, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Basic ' + cred,
      },
    })
    .then(async function (result) {
      if (result.status === 200) {
        return result.data as PurchaseWithId
      }
      return new Error()
    })
    .catch(async function (error) {
      // console.log(error)
      return new Error(error)
    })
}

export async function getPurchases(): Promise<PaginatedPurchases | Error> {
  const cred = localStorage.getItem('credentials')

  return await axios
    .get<PaginatedPurchases>(API_ADDRESS + '/purchases', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + cred,
      },
    })
    .then(async function (result) {
      if (result.status === 200) {
        return result.data
      }
      return new Error()
    })
    .catch(async function (error) {
      console.log(error)
      return new Error(error)
    })
}

export async function getPaginatedPurchases(
  pageSize: number,
  pageNumber: number,
): Promise<PaginatedPurchases | Error> {
  const cred = localStorage.getItem('credentials')

  return await axios
    .get<PaginatedPurchases>(API_ADDRESS + '/purchases', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + cred,
      },
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    })
    .then(async function (result) {
      if (result.status === 200) {
        return result.data
      }
      return new Error()
    })
    .catch(async function (error) {
      console.log(error)
      return new Error(error)
    })
}
