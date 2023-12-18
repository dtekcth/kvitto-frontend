import axios from 'axios'
import { API_ADDRESS } from '../Variables'

export interface BudgetPost {
  id: number
  name: string
  vismaId: number
}

export async function getBudgetPosts(): Promise<BudgetPost[] | Error> {
  // 👇️ const data: GetUsersResponse
  return await axios
    .get<BudgetPost[]>(API_ADDRESS + '/budgetPosts', {
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
