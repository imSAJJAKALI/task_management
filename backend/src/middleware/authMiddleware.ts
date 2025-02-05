import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

interface CustomRequest extends Request {
  user?: any;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Ensure the function exits after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = { id: decoded.id };
    next(); // Call next() to proceed to the next middleware or route
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
