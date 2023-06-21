import { render, screen } from "@testing-library/react";
import LoginPage from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import authSlice from "../../../src/store/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
describe("Test in Login Page", () => {
  test("should be render Correctly ", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
     expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  });
  test('google button should call startGoogleSignIn', () => {
    
  })
  
});
