import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render Login component", () => {
	render(<App />);
	const Element = screen.getByText(/EDU-SETU/i);
	expect(Element).toBeInTheDocument();
	// expect(LoginElement).toHaveTextContent('');
});
