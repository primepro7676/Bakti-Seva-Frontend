import { prisma } from "../lib/prisma";
import type { ContactFormRequest } from "../types";

export async function createContactSubmission(input: ContactFormRequest) {
  return prisma.contactSubmission.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      subject: input.subject?.trim() || null,
      message: input.message.trim(),
    },
  });
}
