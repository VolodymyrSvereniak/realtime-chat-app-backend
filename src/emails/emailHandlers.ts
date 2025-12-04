import { resendClient, sender } from "../lib/resend";
import { createWelcomeEmailTemplate } from "./emailTemplates";

interface SendWelcomeEmailParams {
  email: string;
  name: string;
  clientURL: string;
}

export const sendWelcomeEmail = async (
  params: SendWelcomeEmailParams
): Promise<void> => {
  const { email, name, clientURL } = params;

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: [email],
    subject: "Welcome to Messenger!",
    html: createWelcomeEmailTemplate({ name, clientURL }),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }

  console.log("Welcome email sent successfully:", data);
};
