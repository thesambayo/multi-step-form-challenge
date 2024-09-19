export enum Step {
	User,
	Location,
	Contact,
	Review,
	Success,
};

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

export interface MultiStepsReducerState {
	currentStep: Step;
	stepFormState: StepFormState;
	stepFormErrors: Record<string, string>
}

export enum ReducerActionKind {
  SET_NAME = 'name',
  SET_EMAIL = 'email',
  SET_PASSWORD = 'password',
  SET_ADDRESS = 'address',
  SET_CITY = 'city',
  SET_ZIPCODE = 'zipCode',
  SET_PHONE_NUMBER = 'phoneNumber',
  SET_EMERGENCY_CONTACT = 'emergencyContact',
  SET_NEXT_STEP = 'SET_NEXT_STEP',
  SET_PREV_STEP = 'SET_PREV_STEP',
}

// An interface for our actions
export interface MultiStepAction {
  type: ReducerActionKind;
  payload: string;
}

export interface StepFormItem {
	id: string;
	label: string;
	valueKey: keyof StepFormState;
	reducerType : ReducerActionKind;
}
