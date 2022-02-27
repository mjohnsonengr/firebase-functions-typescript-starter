import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import cors from "cors";

import { analysisFunction } from "./analysis.function.js";
import { functionsConfig } from "./functions-config.js";

// Initialize Firebase Admin SDK to access Firestore
initializeApp();

// CORS configuration.
const options: cors.CorsOptions = {
  origin: functionsConfig.whitelist,
};

/**
 * Trigger a function with an HTTP request.
 */
export const httpFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    cors(options)(request, response, () => analysisFunction(request, response));
  }
);

export const helloWorld = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

// export const addMessage = functions.https.onRequest(
//   async (req: functions.Request, res: functions.Response) => {
//     // Grab the text parameter
//     const original = req.query.text;
//     // Push the new message into Firestore using the Firebase Admin SDK
//     const writeResult = await getFirestore()
//       .collection("messages")
//       .add({ original: original });
//     // Send back a message that we've successfully written the message
//     res.json({ result: `Message with ID: ${writeResult.id} added.` });
//   }
// );

// export const makeUppercase = functions.firestore
//   .document("/messages/{documentId}")
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log("Uppercasing", context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a
//     // Functions such as writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({ uppercase }, { merge: true });
//   });
