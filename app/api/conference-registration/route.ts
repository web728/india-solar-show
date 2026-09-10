import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import Conference from "@/models/Conference";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: Conference,
      data: body,
      emailConfig: (doc) => ({
        subject: `New Conference Registration – India Solar Show – ${doc.fullName}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "India Solar Show",
          subtitle: "New Conference Registration",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Email", value: doc.email as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Company", value: (doc.company as string) || "" },
            { label: "Designation", value: (doc.designation as string) || "" },
            { label: "Country", value: (doc.country as string) || "" },
            { label: "Session Interest", value: (doc.sessionInterest as string) || "" },
            { label: "Message", value: (doc.message as string) || "" },
          ],
          source: "indiasolarshow.com/conference",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Conference Registration",
          fullName: doc.fullName as string,
          company: doc.company as string,
          designation: doc.designation as string,
          email: doc.email as string,
          phone: doc.phone as string,
          country: doc.country as string,
          message: doc.sessionInterest as string,
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Conference registration submitted successfully." });
  } catch (error) {
    console.error("Conference registration error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
