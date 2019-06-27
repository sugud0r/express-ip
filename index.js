var getIpInfo = require('./lib/getIpInfo');

module.exports = function () {
        return function (req, res, next) {
            var xForwardedFor = (req.get('X-Forwarded-For') || '').replace(/:\d+$/, '');
            var ip = xForwardedFor || req.ip;

            req.ipInfo = getIpInfo(ip);

            next();
        }
}
