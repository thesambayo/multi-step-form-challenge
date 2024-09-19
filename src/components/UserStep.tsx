import { MultiStepAction, ReducerActionKind, MultiStepsReducerState, StepFormItem } from "./step.model"

interface StepProps {
	stepState: MultiStepsReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

const userStepForm: StepFormItem[] = [
	{
		id: "name-input",
		label: "Name",
		valueKey: "name",
		reducerType : ReducerActionKind.SET_NAME,
	},
	{
		id: "email-input",
		label: "Email",
		valueKey: "email",
		reducerType : ReducerActionKind.SET_EMAIL,
	},
	{
		id: "password-input",
		label: "Password",
		valueKey: "password",
		reducerType : ReducerActionKind.SET_PASSWORD,
	}
];

export const UserStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section data-test-id="step-1">
		<h3 className="my-2 text-lg font-semibold">User information</h3>

		<div className="flex flex-col space-y-4">
			{
				userStepForm.map(({id, label, reducerType, valueKey}) => (
					<div className="flex flex-col gap-1" key={id}>
						<label htmlFor={id}>{label}</label>
						<input id={id} name={id} data-test-id={id} type="text"
							value={stepState.stepFormState[valueKey]}
							onChange={(event) => updateStepInfo({ type: reducerType, payload: event.target.value })}
						/>
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