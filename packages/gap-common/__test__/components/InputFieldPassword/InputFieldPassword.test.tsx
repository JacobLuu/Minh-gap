import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';
import { green } from '@mui/material/colors';
import * as stories from '../../../src/components/InputFieldPassword/InputFieldPassword.stories';

describe('InputFieldPassword', () => {
  const {
    Normal,
    ShowPassword,
    Errors,
    ErrorsWithCriteriaAllErrors,
    ErrorsWithCriteria1Pass,
  } = composeStories(stories);

  test('Normal', () => {
    const { container } = render(<Normal />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Password');
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');
  });

  test('ShowPassword', async () => {
    const { container } = render(<ShowPassword />);
    await ShowPassword.play?.({ canvasElement: container } as any);
    const input = container.querySelector('input');
    expect(input.value).toBe('password');
    expect(input.type).toBe('text');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');
  });

  test('Errors', () => {
    const { container } = render(<Errors />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Password');
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');

    const outerDiv = container.querySelector('.MuiInputBase-root');
    expect(outerDiv).toHaveClass('Mui-error');
    expect(label).toHaveClass('error');
    const helperText = container.querySelector('.MuiFormHelperText-root');
    expect(helperText).toHaveClass('Mui-error');
    expect(helperText).toHaveTextContent('Invalid password format');
  });

  test('ErrorsWithCriteriaAllErrors', () => {
    const { container } = render(<ErrorsWithCriteriaAllErrors />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Password');
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');

    const outerDiv = container.querySelector('.MuiInputBase-root');
    expect(outerDiv).toHaveClass('Mui-error');
    expect(label).not.toHaveClass('error');
    const helperText = container.querySelector('div > .MuiFormHelperText-root');
    expect(helperText).not.toHaveClass('Mui-error');
    expect(helperText).toHaveTextContent('Password must include');
    const criteriaTexts = container.querySelectorAll(
      'li > .MuiFormHelperText-root',
    );
    criteriaTexts.forEach((criteriaText: any, index: number) => {
      expect(criteriaText).toHaveStyle({ color: 'rgba(0, 0, 0, 0.6)' });
      const message =
        ErrorsWithCriteria1Pass?.args.validateCriterias[index].message;
      // Because it has space at the end of message.
      expect(criteriaText.textContent.trim()).toBe(message);
    });
  });

  test('ErrorsWithCriteria1Pass', () => {
    const { container } = render(<ErrorsWithCriteria1Pass />);
    const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Password');
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('placeholder');

    const outerDiv = container.querySelector('.MuiInputBase-root');
    expect(outerDiv).toHaveClass('Mui-error');
    expect(label).not.toHaveClass('error');
    const helperText = container.querySelector('div > .MuiFormHelperText-root');
    expect(helperText).not.toHaveClass('Mui-error');
    expect(helperText).toHaveTextContent('Password must include');
    const criteriaTexts = container.querySelectorAll(
      'li > .MuiFormHelperText-root',
    );
    criteriaTexts.forEach((criteriaText: any, index: number) => {
      const targetColor = index === 0 ? green[500] : 'rgba(0, 0, 0, 0.6)';

      expect(criteriaText).toHaveStyle({ color: targetColor });
      const message =
        ErrorsWithCriteria1Pass?.args.validateCriterias[index].message;
      // Because it has space at the end of message.
      expect(criteriaText.textContent.trim()).toBe(message);
    });
  });
});
