module.exports = function(app) {
    var utils = {
        ensureAuthenticated : function (req, res, next) {
            if (req.isAuthenticated()) {
                return next(); 
            }
            res.status(app._httpStatus.NOT_FOUND).end();
        }

    }
    return utils;
}