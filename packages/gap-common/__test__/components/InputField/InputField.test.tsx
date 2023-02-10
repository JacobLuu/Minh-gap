import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';
import * as stories from '../../../src/components/InputField/InputField.stories';

describe('InputField', () => {
  const { Input, Email, Password, Errors } = composeStories(stories);

  test('Input', () => {
    const { container } = render(<Input />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Text');
    const input = container.querySelector('input');
    expect(input.type).toBe('text');
    expect(input.name).toBe('text');
    expect(input.placeholder).toBe('placeholder');
  });

  test('Email', () => {
    const { container } = render(<Email />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Email');
    const input = container.querySelector('input');
    expect(input.type).toBe('email');
    expect(input.name).toBe('email');
    expect(input.placeholder).toBe('placeholder');
  });

  test('Password', () => {
    const { container } = render(<Password />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Password');
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');
  });

  test('Errors', () => {
    const { container } = render(<Errors />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Email');
    const input = container.querySelector('input');
    expect(input.type).toBe('email');
    expect(input.name).toBe('email');
    expect(input.placeholder).toBe('placeholder');

    const outerDiv = container.querySelector('.MuiInputBase-root');
    expect(outerDiv).toHaveClass('Mui-error');
    const helperText = container.querySelector('.MuiFormHelperText-root');
    expect(helperText).toHaveClass('Mui-error');
    expect(helperText).toHaveTextContent('Invalid email format');
  });
});
