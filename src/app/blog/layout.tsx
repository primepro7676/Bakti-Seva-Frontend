import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Blog & Articles",
  description: "Read insightful articles on Vedic traditions, puja rituals, spiritual journeys, and wisdom for daily living.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
