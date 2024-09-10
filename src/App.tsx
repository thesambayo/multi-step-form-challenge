import { MultiStepForm } from "./components/MultiStepForm";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-y-6 bg-neutral-100 font-normal text-slate-800">
      <header className="w-full border border-b-slate-200 px-4 py-2">
        <h1>Multi-Step Form</h1>
      </header>
      <main className="w-full max-w-screen-xl p-4">
        <MultiStepForm />
      </main>
    </div>
  );
}

export default App;
