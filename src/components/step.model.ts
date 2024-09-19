export enum Step {
	User,
	Location,
	Contact,
	Review,
	Success,
};


// const multiStepFormState = {
// 	name: "",
// 	email: "",
// 	password: "",
// 	address: "",
// 	city: "",
// 	zipCode: "",
// 	phoneNumber: "",
// 	emergencyContact: "",
// }

export interface StepFormState {
	name: string;
	email: string;
	password: string;
	address: string;
	city: string;
	zipCode: string;
	phoneNumber: string;
	emergencyContact: string;
}

export interface ReducerState {
	currentStep: Step;
	stepFormState: StepFormState;
}

export enum ReducerActionKind {
  SET_NAME = 'SET_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_CITY = 'SET_CITY',
  SET_ZIPCODE = 'SET_ZIPCODE',
  SET_PHONE_NUMBER = 'SET_PHONE_NUMBER',
  SET_EMERGENCY_CONTACT = 'SET_EMERGENCY_CONTACT',
  SET_NEXT_STEP = 'SET_NEXT_STEP',
  SET_PREV_STEP = 'SET_PREV_STEP',
}

// An interface for our actions
export interface MultiStepAction {
  type: ReducerActionKind;
  payload: string;
}