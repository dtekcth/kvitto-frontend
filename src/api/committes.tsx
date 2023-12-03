import axios from 'axios'

export interface Committee {
  Id: number
  Name: string
  VismaId: number
  Active: boolean
}

export async function getCommittes(): Promise<Committee[] | Error> {
  // 👇️ const data: GetUsersResponse
  return await axios
    .get<Committee[]>('http://localhost:3000/committees', {
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
