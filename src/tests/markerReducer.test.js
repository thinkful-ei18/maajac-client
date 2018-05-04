import { markerReducer } from "../reducers/markerReducer";
import { newMarkerSuccess, newMarkerError, newMarkerRequest, getMarkerError, getMarkerSuccess } from "../actions/markerActions";

describe('marker reducer', () => {
  it('should return the intial state', () => {
    const state = markerReducer(undefined, { type: '@@TEST' });
    expect(state).toEqual({
      allMarkers: [],
      loading: false,
      error: false,
    })
  })

  it('should return the current state on an unknown action', () => {
    let currentState = {}
    const state = markerReducer(currentState, { type: '@@UNKNOWN' });
    expect(state).toBe(currentState)
  })

  it('should set loading and error to false', () => {
    const marker = 123
    let state;
    state = markerReducer(state, newMarkerSuccess(marker))
    expect(state).toEqual({
      ...state,
      loading: false,
      error: false
    })
  })

  it('should set the new marker error', () => {
    const err = 'ERROR'
    let state;
    state = markerReducer(state, newMarkerError(err))
    expect(state).toEqual({
      ...state,
      loading: false,
      error: err
    })
  })

  it('should return loading to true', () => {
    let state;
    state = markerReducer(state, newMarkerRequest())
    expect(state).toEqual({
      ...state,
      loading: true
    })
  })

  it('should set error', () => {
    const err = 1234
    let state;
    state = markerReducer(state, getMarkerError(err))
    expect(state).toEqual({
      ...state,
      error: err
    })
  })

  it('should set markers to state and change loading to flase', () => {
    const markers = [{ marker: 123 }, { marker: 456 }]
    let state;
    state = markerReducer(state, getMarkerSuccess(markers))
    expect(state).toEqual({
      ...state,
      error: false,
      loading: false,
      allMarkers: markers
    })
  })
})