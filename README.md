# <img src="http://game-icons.net/icons/lorc/originals/png/magic-portal.png" width="32"> secrettunnel, secret portals from localhost to www

`secrettunnel` generates a random domain name for your project and stores it in `.secrettunnel`. Every time you run `secrettunnel`, the same secret URL is opened.

Use it from the command line:

```
$ secrettunnel 5000
http://a8be4200-5bb7-11e2-b58e-9764e4662e6c.v2.localtunnel.com
```

Or from Node.js:

```javascript
var express = require('express');
var app = express();
app.listen(5000);

var secrettunnel = require('secrettunnel');
secrettunnel(5000, function (err, url) {
  console.log('Public URL:', hook.url);
});
```

## Installation

Install [localtunnel](https://github.com/progrium/localtunnel):

    pip install localtunnel

Then:

    npm install -g secrettunnel

## License & Credits

Smee is MIT licensed.

If you're feeling good today, [donate to localtunnel](http://j.mp/donate-localtunnel) for being such an awesome project.
