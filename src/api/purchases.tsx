import axios, { AxiosResponse } from 'axios'
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

export async function postPurchases(
  object: Purchase,
): Promise<AxiosResponse | Error> {

  
  return await axios
    .post(API_ADDRESS+'/purchases', object, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

export async function getPurchases(): Promise<PurchaseWithId[] | Error> {  
  return await axios
    .get<PurchaseWithId[]>(API_ADDRESS+'/purchases', {
      headers: {
        Accept: 'application/json',
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
