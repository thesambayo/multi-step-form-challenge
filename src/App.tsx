import { MultiStepForm } from "./components/MultiStepForm";

function App() {
	return (
		<div className="flex flex-col min-h-screen items-center gap-y-6 justify-start bg-neutral-100 font-normal text-slate-800">
			<header className="border border-b-slate-200 py-2 px-4 w-full">
				<h1>Multi-Step Form</h1>
			</header>
			<main className="p-4 w-full max-w-screen-xl">
				<MultiStepForm />
			</main>
		</div>
	);
}

export default App;
