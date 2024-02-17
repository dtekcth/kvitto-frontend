import axios, { AxiosResponse } from 'axios'
import { API_ADDRESS } from '../Variables'

export interface UserData {
  id: string
  Email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  hd: string
}

export async function getLogin(): Promise<AxiosResponse | Error> {
  const result = await axios.get(API_ADDRESS + '/login', {})
  window.location.href = result.data
  return result
}

export async function getUser(): Promise<UserData | Error> {
  const result = await axios.get(API_ADDRESS + '/user', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('jwttoken'),
    },
  })
  if (result instanceof Error) {
    return result
  } else {
    return result.data as UserData
  }
}
