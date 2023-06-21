const requireAdmin = (req, res, next) => {
    try {
        if (req.user) {
            const { isAdmin } = req.user;
            if (isAdmin) {
                console.log("this user is an admin")
                next();
            }
        } else {
            res.status(401);
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = requireAdmin;
