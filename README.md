# Coding Challenge: Multi-step Form

## Description

Implement a multi-step form component that allows users to input and review information across multiple steps.

The solution is expected to be implemented in `src/components/MultiStepForm.tsx` file. Feel free to create new files as needed within the `src` folder. However, the entry component that will be tested is `src/components/MultiStepForm.tsx`

## Requirements
1. **Form Steps**:
   - The form should have three steps as listed the below:
     - Step 1: Collect the user's name, email, and password using the following keys and `data-test-id` values.
       - name `name-input`
       - email `email-input`
       - password `password-input`
          - (Must be minimum of 8 characters that includes at least a lowercase and uppercase alphabet, a number and a special character).
     - Step 2: Collect the user's address, city, and zip code using the following keys and `data-test-id` values.
       - address `address-input`
       - city `city-input`
       - zipCode `zipCode-input`
     - Step 3: Collect the user's phone number and emergency contact name using the following keys and `data-test-id` values.
       - phoneNumber`phoneNumber-input`
       - emergencyContact `emergencyContact-input`
   - Use appropriate UI components (e.g., text inputs, dropdown, checkboxes) for the form fields and also show each appropriate error using the data-test-id interpolation of the input `${name/id}-error`.
   - Use the following data-test-id attributes to identify different aspects of this process other than the input fields:
      - Next Button `next-button`
      - Previous Button `previous-button`
      - Submit Button `submit-button`
      - Step Form `step-1` and so on

2. **Form State Management**:
   - Use any method you know to handle the form data inputs by the user.
   - Validate the user input on each step and display appropriate error messages.
   - Maintain the form state across steps, even when the user navigates back and forth except in the case of a full document reload.

3. **Review and Submit**:
   - Add a final step where the user can review the information they've entered with the `data-test-id` of `review-step`.
   - Provide a "Submit" button that triggers a submission with the `data-test-id` of `submit-button`.
   - Display a success message upon successful form submission in an html tag that has the `data-test-id` of `success-message`.