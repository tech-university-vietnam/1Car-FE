import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfoCard from './InfoCard';

test('info card shows skeleton when loading', () => {
  render(<InfoCard loading={true} />);
  expect(screen.getByRole('list')).toHaveClass('ant-skeleton-paragraph');
});
