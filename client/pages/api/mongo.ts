import { NextApiResponse, NextApiRequest } from "next";
import { returnAccountsDb } from "../../lib/mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const accounts = await returnAccountsDb();

  console.log("Receiving request to mongo api");
  console.log("body", request.body);
  console.log("query", request.query);

  try {
    switch (request.method) {
      case "GET":
        const { sismoId } = request.query;
        console.log("Getting an account with sismoid", sismoId);
        const foundUser = await accounts.findOne({ sismoId });

        if (foundUser) {
          return response.status(200).json(true);
        } else {
          return response.status(400).send("Sismo ID not found");
        }

      case "POST":
        const userToAdd = request.body;
        console.log("adding a user", userToAdd);
        await accounts.insertOne(userToAdd);
        return response.status(200).json({ user: userToAdd, success: true });

      case "PUT":
        console.log("Adding data to a user");
        const userToUpdate = request.body;
        const putFilter = { email: userToUpdate.email };

        // create a document that sets the plot of the movie
        const putUpdateDoc = {
          $set: {
            ...userToUpdate,
          },
        };

        await accounts.updateOne(putFilter, putUpdateDoc, { upsert: true });
        return response.status(200).json({ user: userToUpdate, success: true });

      case "PATCH":
        const userToPatch = request.body;
        const patchFilter = { email: userToPatch.email };

        // create a document that sets the plot of the movie
        const patchUpdateDoc = {
          $set: {
            userToPatch,
          },
        };

        await accounts.updateOne(patchFilter, patchUpdateDoc, { upsert: true });
        return response.status(200).json({ user: userToUpdate, success: true });
    }
  } catch (error) {
    response.status(500).send(`Mongo API error ${error}`);
  }
}
