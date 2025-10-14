import jwt from "jsonwebtoken"

export const adminAuth = (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not authorized as admin." });
        } 

        req.admin = decoded; 
        next();

    } catch (error) {
        console.error("Admin Auth Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}