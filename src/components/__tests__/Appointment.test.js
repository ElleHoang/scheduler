/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment/index";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
// it function is an alias to test function ( it & test are interchangeable )
it("renders without crashing", () => {
  render(<Appointment />);
});