import { MultiStepAction, ReducerActionKind, MultiStepsReducerState, StepFormItem } from "./step.model";

interface StepProps {
	stepState: MultiStepsReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

const contactStepForm: StepFormItem[] = [
	{
		id: "phoneNumber-input",
		label: "Phone number",
		valueKey: "phoneNumber",
		reducerType : ReducerActionKind.SET_PHONE_NUMBER,
	},
	{
		id: "emergencyContact-input",
		label: "Emergency contact",
		valueKey: "emergencyContact",
		reducerType : ReducerActionKind.SET_EMERGENCY_CONTACT,
	},
];

export const ContactStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section data-test-id="step-3">
		<h3>Contact information</h3>

		<div className="flex flex-col space-y-4">
			{
				contactStepForm.map(({id, label, reducerType, valueKey}) => (
					<div className="flex flex-col gap-1" key={id}>
						<label htmlFor={id}>{label}</label>
						<input id={id} name={id} data-test-id={id} type="text"
							value={stepState.stepFormState[valueKey]}
							onChange={(event) => updateStepInfo({ type: reducerType, payload: event.target.value })}
						/>
						{/* error */}
						{
								stepState.stepFormErrors[valueKey] && 
								(
									<small data-test-id={`${valueKey}-error`} className="text-red-500">
										{stepState.stepFormErrors[valueKey]}
									</small>
								)
							}
					</div>
				))
			}
		</div>
	</section>
}