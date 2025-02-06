import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config()
const TOKEN = process.env.MAIL_TOKEN
const ENDPOINT = process.env.MAIL_ENDPOINT
console.log(TOKEN)
console.log(ENDPOINT)

const client = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Guy Parnchinda",
};
const recipients = [
  {
    email: "guyparnchinda@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);