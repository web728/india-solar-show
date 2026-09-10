import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { transporter } from "@/lib/email";
import { appendToExcel } from "@/lib/excelSheet";

// Google Sheet ID (browser URL me sheet kholne pe /d/ aur /edit ke beech wala part)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const lead = await Lead.create(body);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a2540; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">India Solar Show</h2>
          <p style="color: #ffb703; margin: 4px 0 0;">New Enquiry Received</p>
        </div>

        <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Full Name</strong></td>
              <td style="padding: 8px 0;">${lead.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Company</strong></td>
              <td style="padding: 8px 0;">${lead.company || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td>
              <td style="padding: 8px 0;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Phone</strong></td>
              <td style="padding: 8px 0;">${lead.phone}</td>
            </tr>
            <tr>
  <td style="padding: 8px 0; color: #64748b;">
    <strong>Designation</strong>
  </td>
  <td style="padding: 8px 0;">
    ${lead.designation || "—"}
  </td>
</tr>

<tr>
  <td style="padding: 8px 0; color: #64748b;">
    <strong>Country</strong>
  </td>
  <td style="padding: 8px 0;">
    ${lead.country || "—"}
  </td>
</tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Interest Type</strong></td>
              <td style="padding: 8px 0;"><strong>${lead.interestType}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 8px 0;">${lead.message || "—"}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 12px 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; font-size: 12px; color: #94a3b8;">
          Source: indiasolarshow.com &nbsp;|&nbsp; Submitted: ${new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"India Solar Show Website" <${process.env.EMAIL_USER}>`,
      to: ["info@futurextrade.com", "admin@futurextrade.com"],
      subject: `New Lead – India Solar Show – ${lead.interestType} – ${lead.fullName}`,
      html,
    });

    // --- Google Sheet me row add karo ---
    // Sheet "Website Enquiries" tab me columns A-N is order me hain:
    // Date & Time | Platform | Register As | Product Profile | Company Name | Contact Person |
    // Designation | Email Id | Mobile No. | (J,K,L blank) | Interest For | Message
    // Note: Lead form me abhi "Product Profile" naam ka alag field nahi hai, isliye wo column
    // khaali ja raha hai. "message" field ko "Interest For" column me daal rahe hain.
  if (SPREADSHEET_ID) {
      await appendToExcel(
        SPREADSHEET_ID,
        "Website Enquiries",
        [
          "Date & Time",
          "Platform",
          "Register As",
          "Product Profile",
          "Company Name",
          "Contact Person",
          "Designation",
          "Email Id",
          "Mobile No.",
          "Website",
          "Address",
          "Country",
          "Interest For",
          "Message",
        ],
        [
          new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          "Enquiry Form",
          lead.interestType,
          "-",
          lead.company || "-",
          lead.fullName,
          lead.designation || "-",
          lead.email,
          lead.phone,
          "-",
          "-",
          lead.country || "-",
          lead.message || "-",
          "-",
        ]
      );
    }

    return Response.json({
      success: true,
      message: "Lead saved + emails sent",
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}