import { getMarkerSuccess, GET_MARKER_SUCCESS, getMarkerError, GET_MARKER_ERROR, getMarkerRequest, GET_MARKER_REQUEST, newMarkerSuccess, NEW_MARKER_SUCCESS, newMarkerError, NEW_MARKER_ERROR, newMarkerRequest, NEW_MARKER_REQUEST } from "../actions/markerActions";

// GET /api/markers
describe('GET markers actions', () => {
  it('should return the getMarkerSuccess and marker', () => {
    const marker = 'i am a marker'
    const action = getMarkerSuccess(marker)
    expect(action.type).toEqual(GET_MARKER_SUCCESS)
    expect(action.markers).toEqual(marker)
  })
  it('should return the getMarkerError and error', () => {
    const err = 'oops'
    const action = getMarkerError(err)
    expect(action.type).toEqual(GET_MARKER_ERROR)
    expect(action.error).toEqual(err)
  })
  it('should return the getMarkerRequest', () => {
    const action = getMarkerRequest()
    expect(action.type).toEqual(GET_MARKER_REQUEST)
  })
})

// POST api/new/marker
describe('POST marker actions', () => {
  it('should return newMarkerSuccess and marker', () => {
    const marker = { marker: 123 }
    const action = newMarkerSuccess(marker)
    expect(action.type).toEqual(NEW_MARKER_SUCCESS)
    expect(action.marker).toEqual(marker)
  })
  it('should return the newMarkerError and error', () => {
    const err = 1234
    const action = newMarkerError(err)
    expect(action.type).toEqual(NEW_MARKER_ERROR)
    expect(action.error).toEqual(err)
  })
  it('should return the newMarkerRequest', () => {
    const action = newMarkerRequest()
    expect(action.type).toEqual(NEW_MARKER_REQUEST)
  })
})