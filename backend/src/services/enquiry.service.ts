import { prisma } from "../lib/prisma";
import type { EnquiryFormRequest } from "../types";

export async function createEnquiry(input: EnquiryFormRequest) {
  return prisma.enquiry.create({
    data: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      service: input.service.trim(),
      message: input.message.trim(),
    },
  });
}

export async function listEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}
