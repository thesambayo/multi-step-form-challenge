/**
 * Implement your solution here and also feel free to create new files as needed within this folder. Although, this is the entry component that will be tested
 */

import { useReducer } from "react";
import { ContactStep } from "./ContactStep";
import { LocationStep } from "./LocationStep";
import { UserStep } from "./UserStep";
import { MultiStepAction, ReducerActionKind, Step, StepFormState } from "./step.model";

/**
 * 
 * setup a global state for the form {most likely a useReducer state or a useContext}
 * each step form do not manage their own state
 * pass in a function prop to each step form that will help to update the global state
 * global state and passed-in function should also handle form validations
 * 
 */

interface ReducerState {
	currentStep: Step;
	stepFormState: StepFormState;
}

const initialReducerState: ReducerState = {
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
	}

}


function reducer(state: ReducerState, action: MultiStepAction) {
	const { type, payload } = action;
  switch (type) {
    case ReducerActionKind.SET_NAME:
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					name: payload
				}
      };
    case ReducerActionKind.SET_EMAIL:
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					email: payload
				}
      };
    case ReducerActionKind.SET_PASSWORD:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					password: payload
				}
      };
    case ReducerActionKind.SET_ADDRESS:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					address: payload
				}
      };
    case ReducerActionKind.SET_CITY:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					city: payload
				}
      };
    case ReducerActionKind.SET_ZIPCODE:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					zipCode: payload
				}
      };
    case ReducerActionKind.SET_PHONE_NUMBER:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					phoneNumber: payload
				}
      };
    case ReducerActionKind.SET_EMERGENCY_CONTACT:
			// validation
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					emergencyContact: payload
				}
      };

			case ReducerActionKind.SET_PREV_STEP:
				// validation

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
					alert("user info is invalid");
					return state;
				} else {
					return {
						...state,
						currentStep: Step.Location
					}
				}
			}


			if (state.currentStep === Step.Location) {
				const { address, city, zipCode } = state.stepFormState;
				if (!address || !city || !zipCode) {
					alert("location info is invalid");
					return state;
				} else {
					return {
						...state,
						currentStep: Step.Contact
					}
				}
			}



			if (state.currentStep === Step.Contact) {
				const { emergencyContact, phoneNumber  } = state.stepFormState;
				if (!emergencyContact || !phoneNumber) {
					alert("contact info is invalid");
					return state;
				} else {
					return {
						...state,
						currentStep: Step.Review
					}
				}
			}
      return {
        ...state,
        stepFormState: {
					...state.stepFormState,
					password: payload
				}
      };
    // case CountActionKind.DECREASE:
    //   return {
    //     ...state,
    //     value: state.count - payload,
    //   };
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

		<div className="flex justify-between mt-5">
			{state.currentStep < Step.Review &&
			<button onClick={() => dispatch({type: ReducerActionKind.SET_PREV_STEP, payload: ""})}>Prev</button>
			}
			{
				state.currentStep < Step.Review &&
				<button onClick={() => dispatch({type: ReducerActionKind.SET_NEXT_STEP, payload: ""})}>Next</button>
			}
			{state.currentStep === Step.Review && <button>Submit</button>}
		</div>
	</div>
	</div>;
};
