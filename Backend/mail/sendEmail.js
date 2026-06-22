import { verificationTemplate } from "./emailTemplets.js";
import { transporter } from "./transporter.config.js";

export const sendEmail = async (email, subject, template) => {
  try {
    const info = await transporter.sendMail({
      from: `"Auth Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: "This is an account notification email.",
      html: template,
    });

    // console.log("mail sent successfully to", email, "messageId:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
};

// for testing.
// for(let i=0; i<1; i++){
//   sendEmail("devendra83538@gmail.com", "Email verification", verificationTemplate(123456))
// }