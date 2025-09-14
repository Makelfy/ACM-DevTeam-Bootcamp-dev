import jwt from "jsonwebtoken";

export const validateAuthAccess = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.slice(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId || false;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
