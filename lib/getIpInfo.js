var geoip = require('geoip-lite');

var getIpInfo = function (ip) {
    // IPV6 addresses can include IPV4 addresses
    // So req.ip can be '::ffff:86.3.182.58'
    // However geoip-lite returns null for these
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0];
    }

    var lookedUpIP = geoip.lookup(ip);

    if ((ip === '127.0.0.1' || ip === '::1')) {
        return 'N/A';
    }

    if (!lookedUpIP){
        return 'N/A';
    }

    return lookedUpIP;
}

module.exports = getIpInfo