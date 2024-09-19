import { MultiStepAction, ReducerActionKind, ReducerState } from "./step.model"

interface StepProps {
	stepState: ReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}
export const UserStep  = ({stepState, updateStepInfo}: StepProps) => {
	return <section>
		<h3 className="my-2 text-lg font-semibold">User information</h3>

		<div className="flex flex-col space-y-4">
			<div className="flex flex-col gap-1">
				<label htmlFor="name-input">Name</label>
				<input id="name-input" name="name-input" data-test-id="name-input" type="text"
					value={stepState.stepFormState.name}
					onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_NAME, payload: event.target.value })}
				/>
				{/* error */}
			</div>
			<div className="flex flex-col gap-1">
				<label htmlFor="email-input">Email</label>
				<input id="email-input" name="email-input" data-test-id="email-input" type="text"
					value={stepState.stepFormState.email}
					onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_EMAIL, payload: event.target.value })}
					/>
			</div>
			<div className="flex flex-col gap-1">
				<label htmlFor="password-input">Password</label>
				<input id="password-input" name="password-input" data-test-id="password-input" type="text"
				value={stepState.stepFormState.password}
				onChange={(event) => updateStepInfo({ type: ReducerActionKind.SET_PASSWORD, payload: event.target.value })}
				 />
			</div>
		</div>
	</section>
}