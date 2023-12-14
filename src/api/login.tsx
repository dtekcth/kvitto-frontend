import axios from 'axios'
import { API_ADDRESS } from '../Variables'
import { Buffer } from "buffer"

export async function getLogin(username: string, password: string): Promise<boolean | Error> {
  // 👇️ const data: GetUsersResponse
  const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');
  const encodedStr = encode(username+':'+password)

  return await axios
    .get(API_ADDRESS+'/login', {
      headers: {
        Authorization: 'Basic ' + encodedStr
      },
    })
    .then(async function (result) {
      if (result.status === 200) {
        localStorage.setItem("credentials", encodedStr)
        return true
      }
      return new Error()
    })
    .catch(async function (error) {
      return new Error(error)
    })
}
