import serverless from "serverless-http";
import expressApp from "../../index.js";

export default handler = serverless(expressApp);
