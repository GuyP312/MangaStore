import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config()
const TOKEN = process.env.MAIL_TOKEN
const ENDPOINT = process.env.MAIL_ENDPOINT
console.log("endpoint:  ",ENDPOINT)
console.log("token: ",TOKEN)
export const mailtrapClient  = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Guy",
};

