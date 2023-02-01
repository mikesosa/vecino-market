import * as Twilio from "twilio";

const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const client = Twilio(accountSid, authToken);

// import twilio from "twilio";

export default async function handler(req, res) {
  const phone = req.body.phone;
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      // body: "Hello from twilio-node",
      channel: "whatsapp",
      to: "+57" + phone, // Text this number
      // from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      return res.status(200).json(message);
    })
    .catch((error) =>
      res.status(500).json({
        message: error.message,
      })
    );
}
