var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    if (req.url === '/' || req.url === '' || req.url === '/index.html') {
        fs.readFile('./index.html', function(err, file) {
            //对主文档设置缓存，无效果
            res.setHeader('Cache-Control', "no-cache, max-age=" + 10);
            res.setHeader('Content-Type', 'text/html');
            // res.writeHead('200', "OK");
            res.end(file);
        });
    } else if (req.url === '/img/cache.png') {
      fs.readFile('./img/cache.png', function(err, file) {
          res.setHeader('Cache-Control', "max-age=" + 10);//缓存五秒
          res.setHeader('ETag', '123');
          res.setHeader('Content-Type', 'images/png');
        //   res.writeHead('200', "Not Modified");
          res.end(file);
      });
  }
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');