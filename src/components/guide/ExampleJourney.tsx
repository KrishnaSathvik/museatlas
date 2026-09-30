export function ExampleJourney({ steps, descriptions }: { steps: string[]; descriptions: string[] }) {
  if (!steps.length) return null;
  return <ol className="example-journey" aria-label="Workflow steps">
    {steps.map((step, index) => <li className="journey-current" key={`${index}-${step}`}>
      <span className="step-number">{index + 1}</span>
      <h3>{step}</h3>
      <p>{descriptions[index]}</p>
    </li>)}
  </ol>;
}
