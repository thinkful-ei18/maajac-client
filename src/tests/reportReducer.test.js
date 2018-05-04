import { reportReducer } from "../reducers/reportReducer";
import { setUserLocationSuccess, setUserLocationError, setUserLocationRequest } from "../actions/reportActions";


describe('report reducer', () => {
  it('should return the intial state', () => {
    const state = reportReducer(undefined, { type: '@@TEST' });
    expect(state).toEqual({
      userLocation: {},
      loading: false,
      error: null,
    })
  })

  it('should return the state when an unknown action is passed', () => {
    let currentState = {}
    const state = reportReducer(currentState, { type: '@@UNKNOWN' })
    expect(state).toBe(currentState)
  })

  it('should set the user location', () => {
    const location = { location: '123 Avenue Drive' }
    let state;
    state = reportReducer(state, setUserLocationSuccess(location))
    expect(state).toEqual({
      ...state,
      userLocation: location,
      loading: false,
      error: false
    })
  })

  it('should set the error', () => {
    const err = 'error'
    let state;
    state = reportReducer(state, setUserLocationError(err))
    expect(state).toEqual({
      ...state,
      loading: false,
      error: err
    })
  })

  it('should set the request', () => {
    let state;
    state = reportReducer(state, setUserLocationRequest())
    expect(state).toEqual({
      ...state,
      loading: true,
      error: false
    })
  })
})