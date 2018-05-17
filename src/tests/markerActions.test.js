import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { API_BASE_URL } from '../config';
import {
  getMarkers,
  getMarkerSuccess,
  GET_MARKER_SUCCESS,
  getMarkerError,
  GET_MARKER_ERROR,
  getMarkerRequest,
  GET_MARKER_REQUEST,
  newMarkerSuccess,
  NEW_MARKER_SUCCESS,
  newMarkerError,
  NEW_MARKER_ERROR,
  newMarkerRequest,
  NEW_MARKER_REQUEST
} from '../actions/markerActions';
import Marker from '../utils/fakemarkers.json';
import * as actions from '../actions/markerActions';
import * as types from '../actions/markerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates GET_MARKER_SUCCESS when getting markers', () => {
    fetchMock.getOnce(`${API_BASE_URL}/markers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const expectedActions = [
      {
        markers: {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET'
        },
        type: 'GET_MARKER_SUCCESS'
      }
    ];

    const initialState = {
      allMarkers: [],
      loading: false,
      error: false
    };

    const store = mockStore({ initialState }); // make an object that looks like the real store

    return store.dispatch(actions.getMarkers()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// GET /api/markers
describe('GET markers actions', () => {
  it('should return the getMarkerSuccess and marker', () => {
    const marker = 'i am a marker';
    const action = getMarkerSuccess(marker);
    expect(action.type).toEqual(GET_MARKER_SUCCESS);
    expect(action.markers).toEqual(marker);
  });
  it('should return the getMarkerError and error', () => {
    const err = 'oops';
    const action = getMarkerError(err);
    expect(action.type).toEqual(GET_MARKER_ERROR);
    expect(action.error).toEqual(err);
  });
  it('should return the getMarkerRequest', () => {
    const action = getMarkerRequest();
    expect(action.type).toEqual(GET_MARKER_REQUEST);
  });
});

// POST api/new/marker
describe('POST marker actions', () => {
  it('should return newMarkerSuccess and marker', () => {
    const marker = { marker: 123 };
    const action = newMarkerSuccess(marker);
    expect(action.type).toEqual(NEW_MARKER_SUCCESS);
    expect(action.marker).toEqual(marker);
  });
  it('should return the newMarkerError and error', () => {
    const err = 1234;
    const action = newMarkerError(err);
    expect(action.type).toEqual(NEW_MARKER_ERROR);
    expect(action.error).toEqual(err);
  });
  it('should return the newMarkerRequest', () => {
    const action = newMarkerRequest();
    expect(action.type).toEqual(NEW_MARKER_REQUEST);
  });
});
