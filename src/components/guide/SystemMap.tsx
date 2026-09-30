import { DiagramImage } from "./DiagramImage";
const nodes = [
  { id: "spark", label: "Spark", category: "Core AI", description: "Reasoning, complex work and permitted tool use.", x: 18, y: 19 },
  { id: "glimmer", label: "Glimmer", category: "Core AI", description: "AI on your own hardware, with local files and tools.", x: 15, y: 48 },
  { id: "code", label: "Code", category: "Software", description: "A workspace for changing software and checking the result.", x: 80, y: 22 },
  { id: "image", label: "Image", category: "Media", description: "Generate images and refine them across edits.", x: 29, y: 79 },
  { id: "voice", label: "Voice", category: "Media", description: "Turn recorded or streaming speech into text.", x: 58, y: 82 },
  { id: "video", label: "Video", category: "Media preview", description: "Explore the announced video and audio direction.", x: 83, y: 64 },
];
export function SystemMap() {
  return <div className="family-overview">
    <DiagramImage id="muse-family" alt="Muse connects Spark for reasoning, Glimmer for local AI, Code for software, Image for image creation, Voice for transcription and Video for media preview." />
    <ul className="family-roles">{nodes.map(n => <li key={n.id}><strong>{n.label}</strong><p>{n.description}</p></li>)}</ul>
  </div>;
}
