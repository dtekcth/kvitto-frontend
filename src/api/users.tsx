import axios, { AxiosResponse } from 'axios'
import { API_ADDRESS } from '../Variables'

export async function addUser(
  email: string,
  role: number,
): Promise<AxiosResponse | Error> {
  const cred = localStorage.getItem('jwttoken')
  const result = await axios.post(
    API_ADDRESS + '/adduser',
    { email: email, roleId: role },
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
