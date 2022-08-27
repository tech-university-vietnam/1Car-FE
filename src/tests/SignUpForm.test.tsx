import React, { useRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpForm } from '../components/SignUpModal';
import userEvent from '@testing-library/user-event';

describe('SignUpForm component', () => {
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
    render(<SignUpForm />);

    const inputName = screen.getByPlaceholderText(/name/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputDateOfBirth = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/accept/i);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    expect(inputName).toHaveValue('');
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(inputDateOfBirth).toHaveValue('');
    expect(checkboxAccept).not.toBeChecked();
    expect(signUpButton).toBeDisabled();
  });

  test('It should prompt error label when input wrong value', async () => {
    render(<SignUpForm />);

    const inputEmail = screen.getByPlaceholderText(/email/i);

    userEvent.type(inputEmail, 'test');
    userEvent.tab();
    const errorEmailLabel = await screen.findByText(/please enter your email/i);
    expect(errorEmailLabel).toBeInTheDocument();
  });

  test('It should enable login button when all inputs are filled', async () => {
    render(<SignUpForm />);

    const inputName = screen.getByPlaceholderText(/name/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputDateOfBirth = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/accept/i);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    userEvent.type(inputName, 'Test name');
    userEvent.type(inputEmail, 'testemail@gmail.com');
    userEvent.type(inputDateOfBirth, '2001-02-24');
    userEvent.keyboard('{enter}');
    userEvent.type(inputPassword, 'fake password');
    userEvent.click(checkboxAccept);

    await waitFor(() => {
      expect(signUpButton).toBeEnabled();
    });
  });

  test('It should disable login button when submit the form', async () => {
    render(<SignUpForm />);
    jest.useFakeTimers();

    const inputName = screen.getByPlaceholderText(/name/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputDateOfBirth = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/accept/i);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    userEvent.type(inputName, 'Test name');
    userEvent.type(inputEmail, 'testemail@gmail.com');
    userEvent.type(inputDateOfBirth, '2001-02-24');
    userEvent.keyboard('{enter}');
    userEvent.type(inputPassword, 'fake password');
    userEvent.click(checkboxAccept);
    userEvent.click(signUpButton);

    expect(signUpButton).toBeDisabled();
    await waitFor(() => {
      expect(signUpButton).toBeEnabled();
    });

    jest.runAllTimers();
  });
});
