import { MultiStepsReducerState, ReducerActionKind, StepFormState } from "./step.model";

export function updateFormStateKey(
	state: MultiStepsReducerState,
	key: ReducerActionKind,
	payload: string
) {
	return {
		...state,
		stepFormState: {
			...state.stepFormState,
			[key]: payload
		}
	};
}

export function updateStateWithError(
	updatedState: MultiStepsReducerState,
	valueKey: keyof StepFormState,
	errorMessage: string,
) {
	return {
		...updatedState,
		stepFormErrors: {
			...updatedState.stepFormErrors,
			[valueKey]: errorMessage
		}
	};
}

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  return regex.test(password);
}