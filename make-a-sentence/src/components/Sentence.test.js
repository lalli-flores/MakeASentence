import { render, fireEvent, cleanup } from '@testing-library/react';
import SentenceForm from './SentenceForm';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from "axios";

axiosMock.get = jest.fn()

describe('SentenceForm', () => {
    afterEach(cleanup);

    it('check if form is rendered with 3 input elements, 2 dropdowns and 2 options and a submit', () => {
        const { getByTestId } = render(<SentenceForm />);
        const form = getByTestId('form');
        const submit = getByTestId('submit');
        
        // Validate we have 3 input text fields for Subject, Object and Verb
        const subject = getByTestId('subjectInput');        
        const object = getByTestId('objectInput');
        const verb = getByTestId('verbInput');

         // Validate we have 2 dropdown select elements for sentence type and verbe tense
         const tense = getByTestId('tenseSelect');        
         const sentenceType = getByTestId('sentenceSelect');

        expect(form).toBeInTheDocument();    
        expect(subject).toBeInTheDocument();
        expect(subject.value).toBe(""); // initial value is empty

        expect(object).toBeInTheDocument();
        expect(object.value).toBe("");

        expect(verb).toBeInTheDocument();
        expect(verb.value).toBe("");

        expect(tense).toBeInTheDocument();
        expect(sentenceType).toBeInTheDocument();

        expect(submit).toBeInTheDocument();

      });


      it('should update data on change event on Input Text fields', () => {
        const { getByTestId } = render(<SentenceForm/>);

        // Subject onChange
        const subject = getByTestId('subjectInput');        
        expect(subject).toHaveValue('');
        fireEvent.change(subject, { target: { value: 'Parrot' } });
        expect(subject).toHaveValue('Parrot');

        // Object onChange
        const object = getByTestId('objectInput');        
        expect(object).toHaveValue('');
        fireEvent.change(object, { target: { value: 'Guava' } });
        expect(object).toHaveValue('Guava');

         // Verb onChange
         const verb = getByTestId('verbInput');        
         expect(verb).toHaveValue('');
         fireEvent.change(verb, { target: { value: 'eat' } });
         expect(verb).toHaveValue('eat');
            
      });


      it("fetches and displays data", async () => {
        // We'll be explicit about what data Axios is to return when `get` is called.

        axiosMock.get.mockResolvedValueOnce({ data: { sentence: "A Parrot is eating a guava" } });
      
        const { getByTestId } = render(<SentenceForm />);
          
        const resolvedSpan = getByTestId("sentenceResult");
        expect(resolvedSpan).toBeInTheDocument();

      });
}) 
