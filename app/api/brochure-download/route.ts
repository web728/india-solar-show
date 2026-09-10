import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import BrochureDownload from "@/models/BrochureDownload";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: BrochureDownload,
      data: body,
      emailConfig: (doc) => ({
        subject: `Brochure Download – India Solar Show – ${doc.fullName}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "India Solar Show",
          subtitle: "Brochure Download Request",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Email", value: doc.email as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Company", value: (doc.company as string) || "" },
            { label: "Designation", value: (doc.designation as string) || "" },
            { label: "Country", value: (doc.country as string) || "" },
          ],
          source: "indiasolarshow.com/downloads",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Brochure Download",
          fullName: doc.fullName as string,
          company: doc.company as string,
          designation: doc.designation as string,
          email: doc.email as string,
          phone: doc.phone as string,
          country: doc.country as string,
          message: "Brochure Download",
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Brochure download request submitted." });
  } catch (error) {
    console.error("Brochure download error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
