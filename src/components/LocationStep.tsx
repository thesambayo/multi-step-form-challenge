import { MultiStepAction, ReducerActionKind, ReducerState } from "./step.model";

interface StepProps {
	stepState: ReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

export const LocationStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section>
		<h3>Location information</h3>

		<div className="flex flex-col space-y-4">
			<div className="flex flex-col gap-1">
				<label htmlFor="address-input">Address</label>
				<input id="address-input" name="address-input" data-test-id="address-input" type="text"
				value={stepState.stepFormState.address}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_ADDRESS, payload: event.target.value })}
				 />
			</div>
			<div className="flex flex-col gap-1">
				<label htmlFor="city-input">City</label>
				<input id="city-input" name="city-input" data-test-id="city-input" type="text"
				value={stepState.stepFormState.city}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_CITY, payload: event.target.value })} />
			</div>
			<div className="flex flex-col gap-1">
				<label htmlFor="zipCode-input">Zip code</label>
				<input id="zipCode-input" name="zipCode-input" data-test-id="zipCode-input" type="text"
				value={stepState.stepFormState.zipCode}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_ZIPCODE, payload: event.target.value })} />
			</div>
		</div>
	</section>
}