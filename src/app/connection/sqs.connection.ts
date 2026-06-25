import { SQSClient } from "@aws-sdk/client-sqs";
import { env } from "../utils/validate-env.js";

// export const sqsClient = new SQSClient({
//   region: env.AWS_REGION,
//   credentials: {
//     accessKeyId: env.AMAZON_ACCESSKEYID,
//     secretAccessKey: env.AMAZON_SECRETACCESSKEY,
//   },
// });
