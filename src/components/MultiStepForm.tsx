/**
 * Implement your solution here and also feel free to create new files as needed within this folder. Although, this is the entry component that will be tested
 */

import { useReducer } from "react";
import { ContactStep } from "./ContactStep";
import { LocationStep } from "./LocationStep";
import { UserStep } from "./UserStep";
import { ReviewStep } from "./Review";
import { MultiStepAction, ReducerActionKind, MultiStepsReducerState, Step } from "./step.model";
import { updateFormStateKey, updateStateWithError, validatePassword } from "./helpers";

/**
 * 
 * setup a global state for the form {most likely a useReducer state or a useContext}
 * each step form do not manage their own state
 * pass in a function prop to each step form that will help to update the global state
 * global state and passed-in function should also handle form validations
 * 
 */

const initialReducerState: MultiStepsReducerState = {
	currentStep: Step.User,
	stepFormState: {
		name: "",
		email: "",
		password: "",
		address: "",
		city: "",
		zipCode: "",
		phoneNumber: "",
		emergencyContact: "",
	},
	stepFormErrors: {}

}


function reducer(currentState: MultiStepsReducerState, action: MultiStepAction) {
	// reset errors on update
	const state = {
		...currentState,
		stepFormErrors: {}
	};

	const { type, payload } = action;
  switch (type) {
    case ReducerActionKind.SET_NAME:
      return updateFormStateKey(state, ReducerActionKind.SET_NAME, payload);
    case ReducerActionKind.SET_EMAIL:
			return updateFormStateKey(state, ReducerActionKind.SET_EMAIL, payload);
    case ReducerActionKind.SET_PASSWORD:
			return updateFormStateKey(state, ReducerActionKind.SET_PASSWORD, payload);
    case ReducerActionKind.SET_ADDRESS:
			return updateFormStateKey(state, ReducerActionKind.SET_ADDRESS, payload);
    case ReducerActionKind.SET_CITY:
			return updateFormStateKey(state, ReducerActionKind.SET_CITY, payload);
    case ReducerActionKind.SET_ZIPCODE:
			return updateFormStateKey(state, ReducerActionKind.SET_ZIPCODE, payload);
    case ReducerActionKind.SET_PHONE_NUMBER:
			return updateFormStateKey(state, ReducerActionKind.SET_PHONE_NUMBER, payload);
    case ReducerActionKind.SET_EMERGENCY_CONTACT:
			return updateFormStateKey(state, ReducerActionKind.SET_EMERGENCY_CONTACT, payload);

			case ReducerActionKind.SET_PREV_STEP:
				if (state.currentStep == Step.User) {
					return state;
				}
				return {
					...state,
					currentStep: state.currentStep - 1
			};


    case ReducerActionKind.SET_NEXT_STEP:
			// validation
			if (state.currentStep === Step.User) {
				const { name, email, password } = state.stepFormState;
				if (!name || !email || !password) {
					let updatedState = state;
					if (!name) {
						updatedState = updateStateWithError(updatedState, "name", "required");
					}
					if (!email) {
						updatedState = updateStateWithError(updatedState, "email", "required");
					}
					if (!password) {
						updatedState = updateStateWithError(updatedState, "password", "required");
					}
					return updatedState;
				}

				const valid = validatePassword(password);
				if (!valid) {
					return updateStateWithError(
						state,
						"password",
						"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
					);
				}
				return {
					...state,
					currentStep: Step.Location
				}
			}

			if (state.currentStep === Step.Location) {
				const { address, city, zipCode } = state.stepFormState;
				if (!address || !city || !zipCode) {
					let updatedState = state;
					if (!address) {
						updatedState = updateStateWithError(updatedState, "address", "required");
					}
					if (!city) {
						updatedState = updateStateWithError(updatedState, "city", "required");
					}
					if (!zipCode) {
						updatedState = updateStateWithError(updatedState, "zipCode", "required");
					}
					return updatedState;
				}
				return {
					...state,
					currentStep: Step.Contact
				}
			}

			if (state.currentStep === Step.Contact) {
				const { emergencyContact, phoneNumber  } = state.stepFormState;
				if (!emergencyContact || !phoneNumber) {
					let updatedState = state;
					if (!emergencyContact) {
						updatedState = updateStateWithError(updatedState, "emergencyContact", "required");
					}
					if (!phoneNumber) {
						updatedState = updateStateWithError(updatedState, "phoneNumber", "required");
					}
					return updatedState;
				}
				return {
					...state,
					currentStep: Step.Review
				}
			}

			if (state.currentStep === Step.Review) {
				return {
					...state,
					currentStep: Step.Success
				}
			}
      return { ...state };
    default:
      return state;
  }
}


export const MultiStepForm = () => {
	const [state, dispatch] = useReducer(reducer, initialReducerState);

  return <div className="max-w-md mx-auto">
		<div>
		{ state.currentStep == Step.User && <UserStep stepState={state} updateStepInfo={dispatch} /> }
		{ state.currentStep === Step.Location && <LocationStep stepState={state} updateStepInfo={dispatch} /> }
		{ state.currentStep === Step.Contact && <ContactStep stepState={state} updateStepInfo={dispatch} /> }
		{ state.currentStep >= Step.Review && <ReviewStep stepState={state} /> }

		<div className="flex justify-between mt-5">
			{state.currentStep < Step.Review &&
			<button data-test-id="previous-button" onClick={() => dispatch({type: ReducerActionKind.SET_PREV_STEP, payload: ""})}>Prev</button>
			}
			{
				state.currentStep < Step.Review &&
				<button data-test-id="next-button" onClick={() => dispatch({type: ReducerActionKind.SET_NEXT_STEP, payload: ""})}>Next</button>
			}
			{state.currentStep === Step.Review &&
			<button data-test-id="submit-button"
				onClick={() => dispatch({type: ReducerActionKind.SET_NEXT_STEP, payload: ""})}
			>
				Submit
				</button>
			}
		</div>
	</div>
	</div>;
};




