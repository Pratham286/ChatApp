import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    // console.log("Passed Verify");
    next(); // Proceed to next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token!!" });
  }
};
