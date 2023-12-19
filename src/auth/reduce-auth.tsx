import { getLogin } from '../api/login'
import { Buffer } from 'buffer'

export interface AuthState {
  userDetails: string
  token: string
  loading: boolean
  errorMessage: string | undefined
}

export interface LoginDetails {
  name: string
  password: string
  error: string | undefined
}

export interface AuthAction {
  type: string
  payload: LoginDetails | undefined
  error: string | undefined
}

export const initialState: AuthState = {
  userDetails: '',
  token: localStorage.getItem('credentials') || '',
  loading: false,
  errorMessage: undefined,
}

export const AuthReducer = (
  initialState: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      if (action.payload) {
        const encodedStr = Buffer.from(
          action.payload.name + ':' + action.payload.password,
          'binary',
        ).toString('base64')
        return {
          ...initialState,
          token: encodedStr,
          loading: false,
        }
      }
      return {
        ...initialState,
        token: '',
        loading: false,
      }

    case 'LOGOUT':
      return {
        ...initialState,
        token: '',
      }

    case 'LOGIN_ERROR':
      if (action.payload) {
        return {
          ...initialState,
          loading: false,
          errorMessage: action.payload.error,
        }
      }
      return {
        ...initialState,
        loading: false,
        errorMessage: 'lmao',
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export async function loginUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<AuthAction>,
  loginPayload: LoginDetails,
) {
  try {
    dispatch({
      type: 'REQUEST_LOGIN',
      payload: undefined,
      error: undefined,
    })
    const result = await getLogin(loginPayload.name, loginPayload.password)
    console.log(result)
    if (result instanceof Error || result.status !== 200) {
      dispatch({
        type: 'LOGIN_ERROR',
        error: 'failed',
        payload: undefined,
      })
    } else {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: loginPayload,
        error: undefined,
      })
      const encodedStr = Buffer.from(
        loginPayload.name + ':' + loginPayload.password,
        'binary',
      ).toString('base64')
      localStorage.setItem('credentials', encodedStr)
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      error: 'error',
      payload: undefined,
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function logout(dispatch: any) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('credentials')
}
