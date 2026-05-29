import "express-session";

declare global {
  namespace Express {
    interface Request {
      session: import("express-session").Session &
        Partial<import("express-session").SessionData>;
      sessionID: string;
    }
  }
}
