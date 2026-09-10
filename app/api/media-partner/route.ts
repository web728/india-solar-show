import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import MediaPartner from "@/models/MediaPartner";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: MediaPartner,
      data: body,
      emailConfig: (doc) => ({
        subject: `New Media Partner Enquiry – India Solar Show – ${doc.organization}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "India Solar Show",
          subtitle: "New Media Partner Enquiry",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Organization", value: doc.organization as string },
            { label: "Email", value: doc.email as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Designation", value: (doc.designation as string) || "" },
            { label: "Country", value: (doc.country as string) || "" },
            { label: "Media Type", value: (doc.mediaType as string) || "" },
            { label: "Website", value: (doc.website as string) || "" },
            { label: "Message", value: (doc.message as string) || "" },
          ],
          source: "indiasolarshow.com/media-partners",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Media Partner",
          fullName: doc.fullName as string,
          company: doc.organization as string,
          designation: doc.designation as string,
          email: doc.email as string,
          phone: doc.phone as string,
          country: doc.country as string,
          message: `Type: ${doc.mediaType || "-"} | ${doc.website || "-"}`,
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Media partner enquiry submitted successfully." });
  } catch (error) {
    console.error("Media partner error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
