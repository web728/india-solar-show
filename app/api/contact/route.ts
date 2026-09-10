import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: Contact,
      data: body,
      emailConfig: (doc) => ({
        subject: `New Contact Enquiry – India Solar Show – ${doc.subject}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "India Solar Show",
          subtitle: "New Contact Enquiry",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Email", value: doc.email as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Company", value: (doc.company as string) || "" },
            { label: "Subject", value: doc.subject as string },
            { label: "Message", value: doc.message as string },
          ],
          source: "indiasolarshow.com/contact",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Contact Enquiry",
          fullName: doc.fullName as string,
          company: doc.company as string,
          email: doc.email as string,
          phone: doc.phone as string,
          message: `${doc.subject}: ${doc.message}`,
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
