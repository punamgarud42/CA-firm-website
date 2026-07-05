import { AIAssistant } from "@/components/dashboard/ai-assistant";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI Tax Assistant" };

export default function AIAssistantPage() {
  return <AIAssistant />;
}
