import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatisticsCards from '../components/StatisticsCards/StatisticsCards.jsx';

describe('StatisticsCards Component', () => {
  const mockStats = {
    total: 10,
    pending: 3,
    inProgress: 2,
    completed: 5
  };

  test('renders stats values correctly', () => {
    render(<StatisticsCards stats={mockStats} />);
    expect(screen.getByText('TOTAL TASKS')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('PENDING TASKS')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS TASKS')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED TASKS')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
