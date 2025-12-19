export const adminAccess = (req, res, next) => {
    try {
        let user = req.user
        if (!user) {
            return res.status(401).json({
                message: "Please login"
            });
        }

        

        if (user.isAdmin !== true) {
            return res.status(403).json({
                message: "Admin access only",
                user: req.user
            });
        }

        if(user.isAdmin) {
            next();
        }

    } catch (error) {
        return res.status(500).json({
            message: "Admin access failed."
        });
    }
};
