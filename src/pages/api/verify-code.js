import * as Twilio from "twilio";

const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const client = Twilio(accountSid, authToken);

// import twilio from "twilio";

export default async function handler(req, res) {
  const phone = req.body.phone;
  const code = req.body.code;
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      // body: "Hello from twilio-node",
      code: code,
      to: phone, // Text this number
      // from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log("error -------------->", error);
      return res.status(error.status).json({
        message: "Invalid code",
      });
    });
}
