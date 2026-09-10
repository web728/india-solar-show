import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import Visitor from "@/models/Visitor";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: Visitor,
      data: body,
      emailConfig: (doc) => ({
        subject: `New Visitor Registration – India Solar Show – ${doc.fullName}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "India Solar Show",
          subtitle: "New Visitor Registration",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Email", value: doc.email as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Company", value: doc.company as string },
            { label: "Designation", value: (doc.designation as string) || "" },
            { label: "Country", value: doc.country as string },
            { label: "Industry", value: doc.industry as string },
            { label: "Purpose of Visit", value: doc.visitPurpose as string },
          ],
          source: "indiasolarshow.com/visitor-registration",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Visitor Registration",
          fullName: doc.fullName as string,
          company: doc.company as string,
          designation: doc.designation as string,
          email: doc.email as string,
          phone: doc.phone as string,
          country: doc.country as string,
          message: `Industry: ${doc.industry || "-"} | Purpose: ${doc.visitPurpose || "-"}`,
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Visitor registration submitted successfully." });
  } catch (error) {
    console.error("Visitor registration error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}