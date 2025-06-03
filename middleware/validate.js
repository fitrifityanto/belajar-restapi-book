import "dotenv/config";

export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(401).send({ message: "API key not provided" });
  } else if (apiKey !== process.env.API_KEY) {
    res.status(403).send({ message: "Invalid API key" });
  } else {
    next();
  }
};
