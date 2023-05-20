import { EventVerifier } from "@complycube/api";

import type { NextApiRequest, NextApiResponse } from "next";

const webhookSecret = process.env.COMPLYCUBE_WEBHOOK_SECRET || "";
const eventVerifier = new EventVerifier(webhookSecret);

export const config = {
  api: {
    bodyParser: {},
  },
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log("receiving webhook request");

  const signature = request.headers["complycube-signature"];

  if (typeof signature !== "string") {
    return response.status(400).send(`ComplyCube signature not present`);
  }

  let event;

  try {
    event = eventVerifier.constructEvent(
      JSON.stringify(request.body),
      signature
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event === undefined) {
    return response.status(400).send("Event undefined");
  }
  // Handle the event
  switch (event.type) {
    case "check.completed": {
      const checkId = event.payload.id;
      const checkOutCome = event.payload.outcome;
      console.log(`Check ${checkId} completed with outcome ${checkOutCome}`);
      break;
    }
    case "check.pending": {
      const checkId = event.payload.id;
      console.log(`Check ${checkId} is pending`);
      break;
    }
    // ... handle other event types
    default: {
      // Unexpected event type
      return response.status(400).end();
    }
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
}
