import { submitForm, formatDate, buildEmailHtml, buildSheetRow } from "@/lib/formService";
import Exhibitor from "@/models/Exhibitor";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await submitForm({
      model: Exhibitor,
      data: body,
      emailConfig: (doc) => ({
        subject: `New Exhibitor Registration – ${doc.company}`,
        toAddresses: ["info@futurextrade.com", "admin@futurextrade.com"],
        html: buildEmailHtml({
          title: "Exhibitor Registration",
          subtitle: "New Exhibitor Registration",
          fields: [
            { label: "Full Name", value: doc.fullName as string },
            { label: "Designation", value: doc.designation as string },
            { label: "Company", value: doc.company as string },
            { label: "Address", value: doc.addressLine1 as string },
            { label: "City", value: (doc.city as string) || "" },
            { label: "State / Province / Region", value: (doc.state as string) || "" },
            { label: "Postal Code", value: (doc.postalCode as string) || "" },
            { label: "Country", value: doc.country as string },
            { label: "Phone", value: doc.phone as string },
            { label: "Email", value: doc.email as string },
            { label: "Booth Size", value: doc.boothSize as string },
            { label: "Products/Services", value: doc.productsServices as string },
            { label: "Sponsorship Interest", value: doc.sponsorshipInterest as string },
          ],
          source: "exhibitor-registration",
          date: formatDate(doc.createdAt),
        }),
      }),
      sheetConfig: (doc) =>
        buildSheetRow({
          formType: "Exhibitor Registration",
          fullName: doc.fullName as string,
          company: doc.company as string,
          designation: doc.designation as string,
          email: doc.email as string,
          phone: doc.phone as string,
          country: doc.country as string,
          message: `Booth: ${doc.boothSize || "-"} | Sponsorship: ${doc.sponsorshipInterest || "-"} | ${doc.productsServices || ""}`,
          date: formatDate(doc.createdAt),
        }),
    });

    return Response.json({ success: true, message: "Exhibitor registration submitted successfully." });
  } catch (error) {
    console.error("Exhibitor registration error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}