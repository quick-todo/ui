import { _setError, _setSuccess } from 'store/error/errorSlice'

const TIMEOUT = 6000

export function setSuccess(text: string) {
  return (dispatch: any) => {
    dispatch(_setSuccess(text))
    setTimeout(() => dispatch(_setSuccess('')), TIMEOUT)
  }
}

export function setError(text: string) {
  return (dispatch: any) => {
    dispatch(_setError(text))
    setTimeout(() => dispatch(_setError('')) , TIMEOUT)
  }
}

export function setHttpError(error: any) {
  console.log('------');
  
  console.log(typeof error)
  
  return (dispatch: any) => {
    // dispatch(_setError(error))
    // setTimeout(() => dispatch(_setError('')) , TIMEOUT)
  }
}