import axios, { AxiosResponse } from 'axios'
import { API_ADDRESS } from '../Variables'

export async function addUser(
  email: string,
  role: number,
): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.post(
    API_ADDRESS + '/adduser',
    { email: email, role_id: role },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer ' + cred,
      },
    },
  )
  return result
}

export async function getUsers(): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.get(
    API_ADDRESS + '/users',

    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer ' + cred,
      },
    },
  )
  return result
}

export async function getAllUsers(): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.get(
    API_ADDRESS + '/allusers',

    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer ' + cred,
      },
    },
  )
  return result
}

export async function getPendingUsers(): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.get(API_ADDRESS + '/pendingusers', {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + cred,
    },
  })
  return result
}

export async function getRoles(): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.get(API_ADDRESS + '/roles', {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Bearer ' + cred,
    },
  })
  return result
}
