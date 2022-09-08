import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AntButton from './AntButton';

test('button clicks and has text', () => {
  const mockOnclick = jest.fn((e) => console.log(e));
  render(<AntButton onClickFunction={mockOnclick} label='test label' />);
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(mockOnclick).toBeCalled();
  expect(screen.getByText('test label')).toBeInTheDocument();
});
