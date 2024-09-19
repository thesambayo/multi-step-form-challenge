import { MultiStepsReducerState, Step } from "./step.model";

interface StepProps {
	stepState: MultiStepsReducerState;
}

export const ReviewStep  = ({ stepState }: StepProps) => {
	return <section data-test-id="review-step">
		{ stepState.currentStep === Step.Success && 
			(
				<div
					data-test-id="success-message"
					className="bg-green-300 text-green-700 p-2 border-green-900"
				>
					Siuu! succesful submission
				</div>
			)
		}

		{ stepState.currentStep === Step.Review && 
			<>
				<h3>Review your info</h3>
				<div className="flex flex-col space-y-4">
					{
						Object.entries(stepState.stepFormState).map(([key, value]) => (
							<div key={key} className="flex gap-3">
								<p className="font-medium">{key}:</p>
								<p>{value}</p>
							</div>
						))
					}
				</div>
			</>
		}
	</section>
}