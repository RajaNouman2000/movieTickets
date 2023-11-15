import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, "raja nouman secret"); // Replace 'yourSecretKey' with your actual secret key

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 401 Unauthorized response
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authenticateMiddleware;
