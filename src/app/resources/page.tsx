import { redirect } from "next/navigation";

// Preserve old bookmarks while keeping source access in the shared footer.
export default function ResourcesPage() {
  redirect("/#sources");
}
