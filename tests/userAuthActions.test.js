import { registerRequest, REGISTER_REQUEST } from "../src/actions/userActions";


describe('user register, login, and refresh actions', () => {
  it('should return the registerRequest() action', () => {
    const action = registerRequest()
    expect(action.type).toEqual(REGISTER_REQUEST)
  })
})