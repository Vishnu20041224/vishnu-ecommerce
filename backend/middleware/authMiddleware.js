import jwt from "jsonwebtoken"

export const authRequied = (req, res, next) => {
    try {
        let auth = req.headers.authorization || ""
        let token = auth.startsWith("Bearer ") ? auth.slice(7) : null

        if (!token) return res.status(401).json({ message: "No Token" })
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        next()
    } catch (error) {
        res.status(401).json({ message: "Token Failed" })
    }
}