import { setUserLocationSuccess, SET_USER_LOCATION_SUCCESS, setUserLocationError, SET_USER_LOCATION_ERROR, setUserLocationRequest, SET_USER_LOCATION_REQUEST } from "../actions/reportActions";


describe('report actions', () => {
  it('should return the setUserLocationSuccess and location', () => {
    const location = 'the office'
    const action = setUserLocationSuccess(location)
    expect(action.type).toEqual(SET_USER_LOCATION_SUCCESS)
    expect(action.location).toEqual(location)
  })
  it('should return the setUserLocationError and error', () => {
    const err = 'oops'
    const action = setUserLocationError(err)
    expect(action.type).toEqual(SET_USER_LOCATION_ERROR)
    expect(action.error).toEqual(err)
  })
  it('should return setUserLocationRequest', () => {
    const action = setUserLocationRequest()
    expect(action.type).toEqual(SET_USER_LOCATION_REQUEST)
  })
})