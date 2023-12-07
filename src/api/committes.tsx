import axios from 'axios'
import { API_ADDRESS } from '../Variables'

export interface Committee {
  id: number
  name: string
  vismaId: number
  active: boolean
}

export async function getCommittes(): Promise<Committee[] | Error> {
  // 👇️ const data: GetUsersResponse
  return await axios
    .get<Committee[]>(API_ADDRESS+'/committees', {
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
