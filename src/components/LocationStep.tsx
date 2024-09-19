import { MultiStepAction, ReducerActionKind, MultiStepsReducerState, StepFormItem } from "./step.model";

interface StepProps {
	stepState: MultiStepsReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

const locationStepForm: StepFormItem[] = [
	{
		id: "address-input",
		label: "Address",
		valueKey: "address",
		reducerType : ReducerActionKind.SET_ADDRESS,
	},
	{
		id: "city-input",
		label: "City",
		valueKey: "city",
		reducerType : ReducerActionKind.SET_CITY,
	},
	{
		id: "zipCode-input",
		label: "Zip code",
		valueKey: "zipCode",
		reducerType : ReducerActionKind.SET_ZIPCODE,
	},
];

export const LocationStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section data-test-id="step-2">
		<h3>Location information</h3>

		<div className="flex flex-col space-y-4">
		{
				locationStepForm.map(({id, label, reducerType, valueKey}) => (
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