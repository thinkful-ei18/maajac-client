import { userAuthReducer } from "../reducers/userAuthReducer";
import { setAuthToken, clearAuth, authRequest, authSuccess, authError, registerError, registerRequest, registerSuccess } from "../actions/userActions";

describe('userAuthReducer reducer', () => {
  it('should return the intial state', () => {
    const state = userAuthReducer(undefined, { type: '@@TEST' });
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null,
    })
  })

  it('should return the state with an unknown action', () => {
    let currentState = {}
    const state = userAuthReducer(currentState, { type: '@@UNKNOWN' })
    expect(state).toBe(currentState)
  })

  it('should set the authToken', () => {
    const authToken = 12345
    let state;
    state = userAuthReducer(state, setAuthToken(authToken))
    expect(state).toEqual({
      ...state,
      authToken: authToken
    })
  })

  it('should clear the authToken', () => {
    let state;
    state = userAuthReducer(state, clearAuth())
    expect(state).toEqual({
      ...state,
      authToken: null,
      currentUser: null
    })
  })

  it('should set loading to true', () => {
    let state;
    state = userAuthReducer(state, authRequest())
    expect(state).toEqual({
      ...state,
      loading: true
    })
  })

  it('should set the currentUser and loading false', () => {
    const user = 'Michael Scott'
    let state;
    state = userAuthReducer(state, authSuccess(user))
    expect(state).toEqual({
      ...state,
      currentUser: user,
      loading: false
    })
  })

  it('should set the error', () => {
    const err = 'bee boop error'
    let state;
    state = userAuthReducer(state, authError(err))
    expect(state).toEqual({
      ...state,
      error: err,
      loading: false
    })
  })

  it('should set the error on register error', () => {
    const err = 'error error';
    let state;
    state = userAuthReducer(state, registerError(err))
    expect(state).toEqual({
      ...state,
      error: err,
      loading: false
    })
  })

  it('should set loading to true on register request', () => {
    let state;
    state = userAuthReducer(state, registerRequest())
    expect(state).toEqual({
      ...state,
      loading: true,
    })
  })

  it('should set loading to false and error to false on register success', () => {
    let state;
    state = userAuthReducer(state, registerSuccess())
    expect(state).toEqual({
      ...state,
      loading: false,
      error: false
    })
  })
})