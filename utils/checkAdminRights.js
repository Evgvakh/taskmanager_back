import jwt from "jsonwebtoken";

export const checkAdminRights = async (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decodedToken = jwt.verify(token, "tskmngrevgvakh");
            req.userId = decodedToken.id;
            req.userRole = decodedToken.role;
            console.log(req.userRole);
            if (req.userRole === "admin") {
                next();
            } else {
                return res.status(403).send("You have no rights for this operation");
            }
        } catch (err) {
            return res.send(err);
        }
    } else {
        return res.status(403).send("You have no rights for this operation");
    }
};
