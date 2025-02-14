import { Request, Response, NextFunction } from "express";


const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies?.auth; // Check if 'auth' cookie exists
  console.log(authCookie)
  if (authCookie) {
    return next(); // Proceed to the next middleware/route
  }

  res.status(401).json({ error: "Unauthorized" });
};

export default authenticate;