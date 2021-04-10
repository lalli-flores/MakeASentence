import { getByDisplayValue, render, screen } from '@testing-library/react';
import SentenceForm from './components/SentenceForm';

describe('SentenceForm', () => {
    it('check if form displays', () => {
        const { getByTestId } = render(<SentenceForm />);
        const form = getByTestId('form');
        // const subject = getByDisplayValue('Subject');
        // const object = getByTestId('filter-input-object');
        const submit = getByTestId('submit');
      
        expect(form).toBeInTheDocument();
        // expect(subject).toBe('');
        // expect(object).toBe('');
        expect(submit).toBeInTheDocument();
      });
}) 
