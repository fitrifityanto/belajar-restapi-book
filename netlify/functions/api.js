import serverless from "serverless-http";
import expressApp from "../../index.js";

export const handler = serverless(expressApp);
