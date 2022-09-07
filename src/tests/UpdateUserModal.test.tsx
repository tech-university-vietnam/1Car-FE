import UpdateUserModal from '../components/UpdateUserModal';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Update user modal component', () => {
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

  test('It should render initial form', () => {
    render(<UpdateUserModal idEdit={false} visible={true} />);

    const inputName = screen.getByPlaceholderText(/name/i);
    const inputPhoneNumber = screen.getByPlaceholderText(/phone number/i);
    const inputDOB = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/information/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send your information',
    });

    expect(inputName).toHaveValue('');
    expect(inputPhoneNumber).toHaveValue('');
    expect(inputDOB).toHaveValue('');
    expect(checkboxAccept).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });
  test('It should be closable when in edit mode', () => {
    render(<UpdateUserModal idEdit={true} visible={true} />);
  });
  test('It should not be closable when in other mode', () => {
    render(<UpdateUserModal visible={true} />);
  });
  test('It should enable submit when all input fields are filled', async () => {
    render(<UpdateUserModal visible={true} />);
    const inputName = screen.getByPlaceholderText(/name/i);
    const inputPhoneNumber = screen.getByPlaceholderText(/phone number/i);
    const inputDOB = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/information/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send your information',
    });

    userEvent.type(inputName, 'Test name');
    userEvent.type(inputDOB, '2001-10-22');
    userEvent.keyboard('{enter}');
    userEvent.type(inputPhoneNumber, 'Test phone number');
    userEvent.click(checkboxAccept);

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
  test('It should disable submit when all input are not filled', async () => {
    render(<UpdateUserModal visible={true} />);
    jest.useFakeTimers();

    const inputName = screen.getByPlaceholderText(/name/i);
    const inputPhoneNumber = screen.getByPlaceholderText(/phone number/i);
    const inputDOB = screen.getByPlaceholderText(/Date of birth/i);
    const checkboxAccept = screen.getByLabelText(/information/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send your information',
    });

    userEvent.type(inputName, 'Test name');
    userEvent.type(inputDOB, '2001-10-22');
    userEvent.keyboard('{enter}');
    userEvent.type(inputPhoneNumber, 'Test phone number');
    userEvent.click(checkboxAccept);
    userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    jest.runAllTimers();
  });
});
