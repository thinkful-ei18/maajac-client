import { reportReducer } from "../reducers/reportReducer";


describe('report reducer', () => {
  it('should return the intial state', () => {
    const state = reportReducer(undefined, { type: '@@TEST' });
    expect(state).toEqual({
      userLocation: {},
      loading: false,
      error: null,
    })
  })
})