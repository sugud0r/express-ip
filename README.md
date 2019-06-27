# Express IP

This is an express module for getting IP information using geoip-lite. It can also be used as express middleware. Basically its an express middleware. So with this, you can get info about an IP.

# Installation

```
npm install express-ip-middleware
```

# Usage

## short
```
const express = require('express');
const app = express();
const expressip = require('express-ip');
app.use(expressip());

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

```

See examples/ folder to more.

# Author
Moisés González <moige01@gmail.com>