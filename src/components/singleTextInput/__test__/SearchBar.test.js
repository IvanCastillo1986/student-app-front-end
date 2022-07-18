import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';


describe("Search bar component", () => {
    it("has a placeholder set to 'Search by name'", () => {
        render(<SearchBar><input placeholder='Search by name' /></SearchBar>)
        const placeholderText = screen.queryByPlaceholderText(/Search by name/i)

        expect(placeholderText).toBeInTheDocument();
    });

    it("shows the search term when it is provided", () => {
        render(<SearchBar searchTerm="Test search term" />);
        const input = screen.getByDisplayValue(/Test search term/);
        
        expect(input).toHaveAttribute("placeholder", "Search by name");
    });
});
