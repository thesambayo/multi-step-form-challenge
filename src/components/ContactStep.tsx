import { MultiStepAction, ReducerActionKind, ReducerState } from "./step.model";

interface StepProps {
	stepState: ReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

export const ContactStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section>
		<h3>User information</h3>

		<div className="flex flex-col space-y-4">
			<div className="flex flex-col gap-1">
				<label htmlFor="phoneNumber-input">Phone number</label>
				<input id="phoneNumber-input" name="phoneNumber-input" data-test-id="phoneNumber-input" type="text"
				value={stepState.stepFormState.phoneNumber}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_PHONE_NUMBER, payload: event.target.value })} />
			</div>
			<div className="flex flex-col gap-1">
				<label htmlFor="emergencyContact-input">Emergency contact</label>
				<input id="emergencyContact-input" name="emergencyContact-input" data-test-id="emergencyContact-input" type="text"
				 value={stepState.stepFormState.emergencyContact}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_EMERGENCY_CONTACT, payload: event.target.value })} />
			</div>
		</div>
	</section>
}