import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyState from '../components/EmptyState/EmptyState.jsx';

describe('EmptyState Component', () => {
  test('renders default messages when no props are passed', () => {
    render(<EmptyState />);
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search/filter parameters or create a new task.')).toBeInTheDocument();
  });

  test('renders custom message and submessage', () => {
    render(<EmptyState message="Custom Title" submessage="Custom details here" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom details here')).toBeInTheDocument();
  });
});
