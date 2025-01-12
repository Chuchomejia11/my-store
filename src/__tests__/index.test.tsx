import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages';

test('renders the home page', () => {
  render(<Home />);
});