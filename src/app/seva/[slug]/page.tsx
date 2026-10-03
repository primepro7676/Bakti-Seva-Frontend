import { notFound } from "next/navigation";
import { getOfferingBySlug, SacredOffering } from "@/lib/data/offerings";
import { fetchSevaBySlug } from "@/lib/backend-api";
import { SevaBookingClient } from "@/components/seva/SevaBookingClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const offering = getOfferingBySlug(slug);

  if (!offering) {
    return {
      title: "Sacred Offering | Bakti Seva",
    };
  }

  return {
    title: `${offering.title} | Bakti Seva`,
    description: offering.shortDescription,
    openGraph: {
      title: offering.title,
      description: offering.shortDescription,
      images: [offering.image],
    },
  };
}

export default async function SevaDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let offering: SacredOffering | undefined = getOfferingBySlug(slug);

  try {
    const dbSeva = await fetchSevaBySlug(slug);

    if (dbSeva) {
      if (offering) {
        offering = {
          ...offering,
          raisedAmount: dbSeva.raisedAmount || offering.raisedAmount,
          goalAmount: dbSeva.goalAmount || offering.goalAmount,
        };
      } else {
        offering = {
          id: dbSeva.id,
          slug: dbSeva.slug,
          title: dbSeva.title,
          type: "seva",
          categoryName: "Community Seva",
          shortDescription: dbSeva.description.slice(0, 160) + "...",
          fullDescription: dbSeva.description,
          image: dbSeva.image || "/images/pooja_thali_set_1790594617235.jpg",
          goalAmount: dbSeva.goalAmount || 500000,
          raisedAmount: dbSeva.raisedAmount || 0,
          benefits: [
            "Direct contribution towards sacred community upliftment",
            "100% transparent photographic and receipt updates",
            "Special prayers and sankalpa in your family's name",
          ],
          includes: [
            "Digital certificate of donation",
            "Family sankalpa recitation during sacred prasad offering",
            "Tax-exemption receipt and periodic newsletter",
          ],
          packages: [
            {
              name: "Supporter",
              amount: 501,
              description: "Provides essential supplies for community seva.",
            },
            {
              name: "Patron",
              amount: 2100,
              description: "Substantial contribution for family blessings.",
            },
            {
              name: "Maha Seva",
              amount: 5100,
              description: "Day-long sponsorship in your family's name.",
            },
          ],
        };
      }
    }
  } catch (error) {
    console.warn("Could not load seva from backend, using static data:", error);
  }

  if (!offering) {
    notFound();
  }

  return <SevaBookingClient offering={offering} />;
}
