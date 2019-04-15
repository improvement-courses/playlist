var authorize = {
    isAuth: (req, resp, next) => {
        if (!req.isAuthenticated()) {
            return resp.redirect('/login')
        }
        next();
    },
    isNotAuth: (req, resp, next) => {
        if (req.isAuthenticated()) {
            return resp.redirect('/')
        }
        next();
    }
};

module.exports = authorize;