import { MultiStepAction, ReducerState } from "./step.model";

interface StepProps {
	stepState: ReducerState;
	updateStepInfo: React.Dispatch<MultiStepAction>
}

export const ReviewStep  = ({stepState }: StepProps) => {
	return <section>
		<h3>Review your info</h3>

		<div className="flex flex-col space-y-4">

		</div>
	</section>
}