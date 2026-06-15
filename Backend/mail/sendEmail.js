import { verificationTemplate } from "./emailTemplets.js";
import { transporter } from "./transporter.config.js";
export const sendEmail = async (email, subject, template) => {
  try {
    await transporter.sendMail({
      from: `"Auth Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: "This is an account notification email.",
      html: template
    });
    console.log("mail sent successfully")
  } catch (error) {
    throw new Error(`Error sending the verification email ${error}`)
  }
};

// for testing.
// for(let i=0; i<1; i++){
//   sendEmail("devendra83538@gmail.com", "Email verification", verificationTemplate(123456))
// }