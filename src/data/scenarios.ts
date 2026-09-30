export type Scenario = { title: string; request: string; steps: string[]; result: string };
export type UseCaseStory = { scenarios: Scenario[]; limitations: string[]; flow: string[] };
export const useCaseStories: Record<string, UseCaseStory> = {
  "software-development": {
    scenarios: [
      { title: "Fix a broken checkout", request: "Find why checkout fails after an address is entered.", steps: ["Trace the relevant code", "Reproduce the failure", "Make a focused change", "Run tests and inspect the page"], result: "A proposed fix with checks for you to review." },
      { title: "Understand an unfamiliar repository", request: "Show me where this app handles sign-in.", steps: ["Read the project structure", "Follow the sign-in request", "Identify dependencies", "Explain the path through the code"], result: "A map of the relevant files and how they connect." },
      { title: "Add a small feature", request: "Let users sort this table by date.", steps: ["Inspect the existing table", "Follow project conventions", "Implement sorting", "Check empty and populated states"], result: "A reviewable change that fits the existing app." },
    ], flow: ["Repository", "Inspect", "Change", "Test", "Review"], limitations: ["Tests cover only the behavior they check; passing tests do not prove correctness.", "Review changes before merging, especially authentication, payments or data handling.", "Tool permissions and a working development environment determine what can be executed."],
  },
  research: {
    scenarios: [
      { title: "Compare three products before buying", request: "Compare these three products against my requirements.", steps: ["Find current information", "Compare relevant specifications", "Reconcile differences between sources", "Build a structured comparison"], result: "A comparison with source links and unresolved questions." },
      { title: "Understand a long report", request: "Explain the key claims in this report and what supports them.", steps: ["Read the document", "Identify key sections", "Summarize claims and evidence", "Answer follow-up questions"], result: "A concise briefing with references to the report." },
      { title: "Research a technical question", request: "What evidence supports these competing approaches?", steps: ["Search primary sources", "Gather evidence", "Compare conflicting claims", "Produce a sourced answer"], result: "An explanation that separates evidence, inference and uncertainty." },
    ], flow: ["Question", "Sources", "Compare", "Synthesize", "Report"], limitations: ["Sources can be outdated, incomplete or wrong; check dates and primary evidence.", "A citation is not proof that the linked page supports the claim.", "Private, paywalled or inaccessible material may require you to provide documents."],
  },
  "computer-automation": {
    scenarios: [
      { title: "Collect information from a website", request: "Put the details on these pages into a table.", steps: ["Open the pages", "Locate the relevant fields", "Collect the values", "Compare the table with the source"], result: "A table you can check against the original pages." },
      { title: "Prepare a form for review", request: "Fill in this form using my notes, then let me review it.", steps: ["Read the notes", "Map information to fields", "Fill in the form", "Pause before submission"], result: "A prepared form with the final decision left to you." },
      { title: "Organize downloaded documents", request: "Sort these documents into the right project folders.", steps: ["Inspect the files", "Propose a folder structure", "Move permitted files", "Verify their new locations"], result: "An organized workspace and a record of changes." },
    ], flow: ["Observe screen", "Plan action", "Use software", "Verify"], limitations: ["Interfaces change and actions can target the wrong control.", "Logins, access restrictions and approval prompts can interrupt work.", "Review irreversible actions before allowing them."],
  },
  "local-ai": {
    scenarios: [
      { title: "Review private code", request: "Review this repository using a local model.", steps: ["Load the model locally", "Read permitted source files", "Inspect changes", "Write a local review"], result: "Review notes produced in your own environment." },
      { title: "Ask questions about local documents", request: "Find the explanation in this folder of notes.", steps: ["Select the documents", "Retrieve relevant passages", "Compare their contents", "Answer with local references"], result: "An answer grounded in files you selected." },
      { title: "Try an offline tool workflow", request: "Summarize these files without calling an external service.", steps: ["Check runtime and model availability", "Disable external dependencies", "Run local tools", "Inspect the output"], result: "A local result, subject to your runtime and network configuration." },
    ], flow: ["Your hardware", "Glimmer", "Local tools", "Local result"], limitations: ["You need suitable hardware, model files and a runtime—the software that runs the model.", "Running the model locally (local inference) does not prevent tools from accessing the network.", "You manage updates, access controls and the quality of the output."],
  },
  voice: {
    scenarios: [
      { title: "Turn a meeting into searchable notes", request: "Transcribe this recording and help organize the discussion.", steps: ["Provide the recording", "Transcribe speech", "Separate speakers where possible", "Review and organize the transcript"], result: "Text you can search and use to draft meeting notes." },
      { title: "Add spoken commands to an app", request: "Let a user say which item to open.", steps: ["Capture speech", "Convert it to text", "Interpret the intended action", "Confirm and execute in the app"], result: "A voice-input workflow with explicit application controls." },
      { title: "Caption a live conversation", request: "Show spoken words as text while someone talks.", steps: ["Stream permitted audio", "Detect speech turns", "Display transcript updates", "Handle corrections"], result: "Live text, with accuracy dependent on audio conditions." },
    ], flow: ["Audio", "Transcript", "Interpretation", "Application"], limitations: ["Muse Voice Transcribe is speech-to-text, not speech generation.", "Noise, overlapping speakers and unusual names can reduce accuracy.", "Obtain appropriate consent before recording or processing other people’s speech."],
  },
  images: {
    scenarios: [
      { title: "Explore a visual direction", request: "Create several visual treatments for this idea.", steps: ["Describe the subject and style", "Generate candidates", "Compare the results", "Choose a direction to refine"], result: "A set of concepts to evaluate, not a finished design system." },
      { title: "Refine an existing image", request: "Adjust the composition while keeping the main subject.", steps: ["Provide the image", "Describe the intended edit", "Inspect changed areas", "Refine unwanted differences"], result: "An edited image that still needs visual review." },
      { title: "Create related assets", request: "Make a consistent set of illustrations for these topics.", steps: ["Define a shared visual specification", "Write distinct subject prompts", "Generate each asset", "Review consistency across the set"], result: "A coherent candidate library for an application or campaign." },
    ], flow: ["Brief", "Generate", "Inspect", "Edit", "Final image"], limitations: ["Text, geometry and continuity can require multiple revisions.", "Generated images need human review for factual and visual accuracy.", "Check applicable terms and permissions for input and output use."],
  },
  "business-workflows": {
    scenarios: [
      { title: "Prepare a business campaign", request: "Review my connected store and social account performance, then draft next week’s campaign.", steps: ["Authorize the relevant business connectors", "Review permitted sales and campaign information", "Draft content and a proposed plan", "Ask for approval before publishing or spending"], result: "A campaign draft to review, based on available connected information." },
      { title: "Prepare a meeting", request: "Bring together the agenda and relevant project documents.", steps: ["Find the meeting context", "Collect permitted documents", "Identify open questions", "Prepare a briefing"], result: "A meeting brief you can correct and share." },
      { title: "Monitor a recurring task", request: "Check this source regularly and tell me when it changes.", steps: ["Define the condition", "Set up permitted checks", "Compare new information", "Notify when the condition is met"], result: "A notification workflow supported by the surrounding software." },
    ], flow: ["Goal", "Connected information", "Prepare", "Approval", "Action"], limitations: ["Connected services must be configured and authorized.", "Background work depends on scheduling and the surrounding software.", "Review outgoing messages and changes to shared information."],
  },
  "personal-productivity": {
    scenarios: [
      { title: "Plan a busy day", request: "Help me fit these tasks around my appointments.", steps: ["Read the constraints", "Estimate available time", "Suggest a sequence", "Let you adjust the plan"], result: "A proposed plan based on the information you provide." },
      { title: "Prepare for a trip", request: "Organize these bookings and notes into an itinerary.", steps: ["Collect your documents", "Extract dates and locations", "Check for conflicts", "Create an itinerary"], result: "An organized itinerary to verify against the bookings." },
      { title: "Track a changing item", request: "Help me monitor the status of this item.", steps: ["Specify the source", "Define what matters", "Check for a change", "Prepare a notification"], result: "An update when supported tools detect the condition." },
    ], flow: ["Your goal", "Context", "Plan", "Review", "Action"], limitations: ["Plans depend on complete and accurate personal information.", "Calendar, email and monitoring features depend on connected tools.", "Purchases, messages and other consequential actions need your review."],
  },
  "smart-devices": {
    scenarios: [
      { title: "Ask about what you see", request: "Help me understand this object or scene.", steps: ["Capture permitted context", "Interpret the view", "Connect it to your question", "Present an answer"], result: "Contextual help dependent on the device and available features." },
      { title: "Use a hands-free interface", request: "Help me with a task while my hands are occupied.", steps: ["Receive spoken input", "Interpret the request", "Use available tools", "Return a response"], result: "A device-based interaction rather than a desktop workflow." },
      { title: "Continue a task across surfaces", request: "Help me pick up this task when I return to my workspace.", steps: ["Establish the task context", "Preserve supported information", "Resume in an available interface", "Review the next step"], result: "A continuity scenario to check against the device’s supported features." },
    ], flow: ["Device input", "Context", "Muse", "Response"], limitations: ["Availability differs by device, region and rollout.", "A device announcement is not a guarantee of every scenario shown here.", "Be mindful of other people when cameras or microphones are active."],
  },
  "multi-agent": {
    scenarios: [
      { title: "Split a product prototype into roles", request: "Coordinate design, frontend, backend and writing work.", steps: ["Define separate responsibilities", "Share constraints", "Produce independent work", "Review the combined result"], result: "A coordinated draft with a clear integration step." },
      { title: "Investigate several approaches", request: "Explore these possible solutions independently.", steps: ["Define comparison criteria", "Assign bounded investigations", "Collect evidence", "Compare the findings"], result: "Alternative proposals you can evaluate side by side." },
      { title: "Work on independent code changes", request: "Make these separate changes without overwriting each other.", steps: ["Separate workspaces", "Assign independent changes", "Review each result", "Merge and test together"], result: "Combined work that still requires integration checks." },
    ], flow: ["Coordinator", "Separate work", "Review", "Integrate", "Test"], limitations: ["More workers can increase cost and coordination overhead.", "Parallel changes can conflict even in isolated workspaces.", "A shared mistake can propagate; independent review remains valuable."],
  },
};
