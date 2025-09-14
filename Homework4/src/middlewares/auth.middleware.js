import jwt from "jsonwebtoken";
import { OpaqueTokenSchema } from "../db/schemas/opaqueToken.schema.js";
import { AppDataSource } from "../db/data-source.js";

const opaqueTokenRepository = AppDataSource.getRepository(OpaqueTokenSchema);

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

export const validateAuthElevated = (action) => {
  return async (req, res, next) => {
    try {
      const accessToken = await opaqueTokenRepository.findOne({
        where: { token: req.params.elevatedAccessToken },
      });

      const expired = accessToken
        ? new Date() > new Date(accessToken.expiresAt)
        : true;

      if (!accessToken || expired || accessToken.used) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      if (accessToken.action !== action) {
        return res.status(401).json({ error: "Invalid token action" });
      }

      accessToken.used = true;
      await opaqueTokenRepository.save(accessToken);

      next();
    } catch (error) {
      console.error("Elevated auth middleware error:", error);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
