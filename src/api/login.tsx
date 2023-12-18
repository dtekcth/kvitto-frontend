import axios, { AxiosResponse } from 'axios'
import { API_ADDRESS } from '../Variables'
import { Buffer } from 'buffer'

export async function getLogin(
  username: string,
  password: string,
): Promise<AxiosResponse | Error> {
  // 👇️ const data: GetUsersResponse
  let encodedStr
  if (username === '' && password === '') {
    encodedStr = localStorage.getItem('credentials')
  } else {
    const encode = (str: string): string =>
      Buffer.from(str, 'binary').toString('base64')
    encodedStr = encode(username + ':' + password)
  }

  return await axios.get(API_ADDRESS + '/login', {
    headers: {
      Authorization: 'Basic ' + encodedStr,
    },
  })
}
