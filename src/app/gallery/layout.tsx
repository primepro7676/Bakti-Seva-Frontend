import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Gallery",
  description: "Explore beautiful moments from our pujas, temple events, and premium spiritual items in our gallery.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
