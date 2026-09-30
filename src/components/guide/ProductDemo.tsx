const checkout = [
  { label: "Repository", file: "checkout / address.ts", text: "Locate the address form and the validation logic it calls.", code: "checkout/\n  address.ts\n  submit-order.ts\n  checkout.test.ts" },
  { label: "Inspect", file: "A reproducible failure", text: "An empty apartment field is rejected even though it is optional.", code: "Input: apartment = \"\"\nExpected: address accepted\nObserved: address rejected" },
  { label: "Change", file: "A focused correction", text: "Treat the optional field as absent when it contains no text.", code: "const apartment = input.apartment.trim();\nconst address = {\n  ...requiredFields,\n  apartment: apartment || undefined,\n};" },
  { label: "Test", file: "Check both paths", text: "Check an address with an apartment, and one without it.", code: "✓ accepts an apartment number\n✓ accepts an empty optional field\n✓ still rejects missing required fields" },
  { label: "Review", file: "Ready for a person to review", text: "Review the diff, the tests and the browser behavior before merging.", code: "Changed: address normalization\nChecked: required + optional fields\nNext: human review" },
];
type Step = { label: string; text: string };
function Steps({ items }: { items: Step[] }) {
  return <ol className="walkthrough-steps">{items.map((step, i) => <li key={step.label}>
    <span className="step-number">{i + 1}</span>
    <div><h3>{step.label}</h3><p>{step.text}</p></div>
  </li>)}</ol>;
}
export function ProductDemo({ kind }: { kind: string }) {
  if (kind === "spark") return <div><Steps items={[
    {label:"Understand the failure",text:"Connect the user’s report with the address form, relevant code and expected checkout behavior."},
    {label:"Form a hypothesis",text:"Consider whether the empty optional field is being treated as a missing required value."},
    {label:"Choose the next check",text:"Ask the development tools to reproduce both the empty-field and completed-field cases."},
    {label:"Evaluate the result",text:"Use the tool output to decide whether to revise the hypothesis or propose a correction for review."},
  ]}/><p className="illustration-note">Illustrative reasoning process. Muse Code supplies the editing and testing workflow.</p></div>;
  if (kind === "code") return <div className="expanded-code-demo">
    {checkout.map((step, i) => <section className="code-demo" key={step.label}>
      <h3 className="demo-step-heading"><span className="step-number">{i + 1}</span>{step.label}</h3>
      <div className="code-demo-content"><div><p className="demo-filename">{step.file}</p><pre>{step.code}</pre></div><div><p>{step.text}</p></div></div>
    </section>)}<p className="illustration-note">Illustrative walkthrough, not a live repository or test run.</p>
  </div>;
  if (kind === "voice") {
    const turns = [{speaker:"Speaker 1",text:"Can we review the prototype tomorrow?",note:"Speech is converted into text."},{speaker:"Speaker 2",text:"Yes. Let’s make it ten in the morning.",note:"A new turn can be attributed to another speaker."},{speaker:"Application",text:"Proposed task: review prototype tomorrow at 10:00.",note:"An application can interpret the transcript. Voice Transcribe itself does not schedule the meeting."}];
    return <div className="voice-demo"><div className="waveform" aria-hidden="true">{Array.from({length:42},(_,i)=><i key={i} style={{height:`${15+Math.abs(Math.sin(i*1.7))*65}px`}} className="heard"/>)}</div>{turns.map(turn => <div key={turn.speaker} className="transcript-turn"><span>{turn.speaker}</span><blockquote>{turn.text}</blockquote><p>{turn.note}</p></div>)}<small>Illustrative transcript. No microphone recording or live transcription.</small></div>;
  }
  if (kind === "image") return <div className="image-demo"><Steps items={[{label:"Prompt",text:"Describe a cobalt-blue ceramic vessel on a pale gray background."},{label:"Generate",text:"Start with a simple shape and inspect the composition."},{label:"Edit",text:"Ask for a ribbed surface while preserving the subject and setting."},{label:"Review",text:"Compare the final image against the brief, including details and unwanted changes."}]}/><small>Concept artwork generated for this guide with ChatGPT, not an output from Muse Image.</small></div>;
  if (kind === "video") return <div className="video-demo"><Steps items={[{label:"Subject",text:"Establish the subject and setting."},{label:"Motion",text:"Describe how the subject should move."},{label:"Continuity",text:"Review continuity between frames."},{label:"Sound",text:"Consider how sound supports the sequence."}]}/><small>Illustrative storyboard, not a generated video or a live Muse feature.</small></div>;
  const local=kind==="glimmer";
  const steps=local?[{label:"Model",text:"Load Glimmer in a compatible runtime—the software that runs the model—on your hardware."},{label:"Files",text:"Make only the selected local files available to the workflow."},{label:"Tools",text:"Control tool execution and network access in your own environment."},{label:"Review",text:"Inspect the result locally. Local inference alone does not isolate every tool."}]:[{label:"Request",text:"Provide your trip bookings and notes, and ask for an itinerary with any conflicts flagged."},{label:"Prepare",text:"Muse reads the permitted documents, organizes dates and locations, and identifies gaps or overlaps."},{label:"Approve",text:"In this scenario, ask it to pause before changing a booking or sending a message. Available connections and permission settings determine what can proceed."},{label:"Result",text:"Review the proposed itinerary and unresolved questions against your original bookings."}];
  return <div className="local-demo"><h3>{local?"Your computer":"Your workspace"}</h3><Steps items={steps}/><small>Illustrative workflow. Actual access depends on configuration.</small></div>;
}
