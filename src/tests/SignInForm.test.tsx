import React, { useRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignInForm } from '../components/SignInModal';
import userEvent from '@testing-library/user-event';

describe('SignInForm component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('It should render initial form', async () => {
    render(<SignInForm />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const checkboxRemember = screen.getByLabelText(/remember me/i);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(checkboxRemember).not.toBeChecked();
    expect(loginButton).toBeDisabled();
  });

  test('It should prompt error label when input wrong value', async () => {
    render(<SignInForm />);

    const inputEmail = screen.getByPlaceholderText(/email/i);

    userEvent.type(inputEmail, 'test');
    userEvent.tab();
    const errorEmailLabel = await screen.findByText(/please enter your email/i);
    expect(errorEmailLabel).toBeInTheDocument();
  });

  test('It should enable login button when all inputs are filled', async () => {
    render(<SignInForm />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(inputPassword, 'fake password');
    userEvent.type(inputEmail, 'testemail@gmail.com');

    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
  });

  test('It should disable login button when submit the form', async () => {
    render(<SignInForm />);
    jest.useFakeTimers();

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(inputPassword, 'fake password');
    userEvent.type(inputEmail, 'testemail@gmail.com');
    userEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });

    jest.runAllTimers();
  });
});
