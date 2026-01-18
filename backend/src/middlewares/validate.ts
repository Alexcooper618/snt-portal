import { Request, Response, NextFunction } from "express";

const phoneRegex = /^\+?\d{10,15}$/;

const badRequest = (res: Response, details: string[]) =>
  res.status(400).json({ error: "Invalid request", details });

export const validateRegisterSntPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sntName, location, chairmanName, chairmanPhone } = req.body;
  const details: string[] = [];

  if (!sntName || typeof sntName !== "string") {
    details.push("sntName is required and must be a string");
  }

  if (location !== undefined && location !== null && typeof location !== "string") {
    details.push("location must be a string when provided");
  }

  if (!chairmanName || typeof chairmanName !== "string") {
    details.push("chairmanName is required and must be a string");
  }

  if (!chairmanPhone || typeof chairmanPhone !== "string") {
    details.push("chairmanPhone is required and must be a string");
  } else if (!phoneRegex.test(chairmanPhone)) {
    details.push("chairmanPhone must be a valid phone number");
  }

  if (details.length > 0) {
    return badRequest(res, details);
  }

  next();
};

export const validateLoginPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body;
  const details: string[] = [];

  if (!phone || typeof phone !== "string") {
    details.push("phone is required and must be a string");
  } else if (!phoneRegex.test(phone)) {
    details.push("phone must be a valid phone number");
  }

  if (details.length > 0) {
    return badRequest(res, details);
  }

  next();
};
