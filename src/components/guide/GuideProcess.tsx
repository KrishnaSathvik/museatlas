import { Illustration } from "./Illustration";
const stages = [
  {title:"Ask",summary:"Start with a goal.",text:"Describe what you want to accomplish and provide the information Muse needs. Set boundaries before work begins.",example:"Help me improve this website and check that it works."},
  {title:"Understand",summary:"Make sense of the task.",text:"The model considers the goal, relevant context and constraints. A larger task can become several smaller pieces of work.",example:"Read the files, understand the layout, and identify what needs to change."},
  {title:"Work",summary:"Use permitted tools.",text:"The surrounding software gives the model access to tools. Each action is limited by available capabilities and configured permissions.",example:"Change the code, then open the result in a browser."},
  {title:"Check",summary:"Review the outcome.",text:"Inspect the result, run relevant checks, and correct problems. A person still decides whether the output meets the goal.",example:"Review the page, the changes and the checks before accepting the result."},
];
export function GuideProcess() {
  return <div className="guided-process expanded-process">{stages.map((stage, active) => <section key={stage.title} className="stage-detail rich-stage"><div><span className="step-number">{active + 1}</span><h3>{stage.title}</h3><p className="section-lede">{stage.summary}</p><p>{stage.text}</p><blockquote>{stage.example}</blockquote></div><div className="stage-visual">
      {active===0?<div className="request-visual"><span>Your request</span><p>Improve this website.</p><div><span>Project files</span><span>Design notes</span></div><small>Boundary: prepare changes for review.</small></div>:active===1?<div className="context-visual"><div><span>Goal</span><strong>A clearer website</strong></div><div><span>Context</span><strong>Files + design notes</strong></div><div><span>Plan</span><strong>Inspect → change → check</strong></div></div>:active===2?<div className="tools-visual"><Illustration id="product-code" alt="Concept: code, files and terminal in a working environment"/><div><span>Browser</span><span>Files</span><span>Code</span></div></div>:<div className="check-visual"><span>Review the work</span><div>✓ Inspect the rendered page</div><div>✓ Run relevant checks</div><div>↻ Correct remaining problems</div><strong>Ready for your review</strong><small>Illustrative checks, not a live run.</small></div>}
    </div></section>)}
  </div>;
}
