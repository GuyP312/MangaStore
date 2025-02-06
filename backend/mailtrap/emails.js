import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempletes.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"
export const sendverficationEmail = async (email, verificationToken) => {
    const recipient = [
        { email }
    ]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        }) 
        console.log(`successfully sent verification email sent to ${email}. Response:`, response)
    }
    catch (error) {
        console.error(`Failed to send verification email to ${email}. Error:`, error)
    }
}