import { registerRequest, REGISTER_REQUEST, registerError, REGISTER_ERROR, registerSuccess, REGISTER_SUCCESS, authRequest, AUTH_REQUEST, authSuccess, AUTH_SUCCESS, authError, AUTH_ERROR, setAuthToken, SET_AUTH_TOKEN, clearAuth, CLEAR_AUTH } from "../actions/userActions";


describe('user register actions', () => {
  it('should return the registerRequest() action', () => {
    const action = registerRequest()
    expect(action.type).toEqual(REGISTER_REQUEST)
  })
  it('should return the registerError() action', () => {
    const err = 'oops'
    const action = registerError(err)
    expect(action.type).toEqual(REGISTER_ERROR)
    expect(action.error).toEqual(err)
  })
  it('should return the registerSuccess action', () => {
    const action = registerSuccess()
    expect(action.type).toEqual(REGISTER_SUCCESS)
  })
})

describe('user login actions', () => {
  it('should return the authRequest() action', () => {
    const action = authRequest()
    expect(action.type).toEqual(AUTH_REQUEST)
  })
  it('should return the authSuccess action', () => {
    const newUser = 'hiThere'
    const action = authSuccess(newUser)
    expect(action.type).toEqual(AUTH_SUCCESS)
    expect(action.currentUser).toEqual(newUser)
  })
  it('should return the authError action', () => {
    const err = 'oops'
    const action = authError(err)
    expect(action.type).toEqual(AUTH_ERROR)
    expect(action.error).toEqual(err)
  })
  it('should set the auth token', () => {
    const authToken = 123
    const action = setAuthToken(authToken)
    expect(action.type).toEqual(SET_AUTH_TOKEN)
    expect(action.authToken).toEqual(authToken)
  })
  it('should return the clearAuth() action', () => {
    const action = clearAuth()
    expect(action.type).toEqual(CLEAR_AUTH)
  })
})