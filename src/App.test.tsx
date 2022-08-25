import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import SignInModal from './components/SignInModal';

test('renders learn react link', () => {
  render(<App />);

  // const button = screen.getByRole("button", { name: /hello/i })
  // expect(button).toBeEnabled();
  // userEvent.click(button);
});
