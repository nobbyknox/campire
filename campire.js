var fs = require('fs'),
    request = require('request'),
    dateFormat = require('dateformat');

var Target = function(url, baseName, enabled) {
    this.url = url;
    this.baseName = baseName;
    this.enabled = enabled;
}

var targets = [new Target('http://gardenia.sanparks.org/webcams/nossob.jpg', 'nossob/nossob_%s.jpg', true),
               new Target('http://gardenia.sanparks.org/webcams/orpen.jpg', 'orpen/orpen_%s.jpg', false),
               new Target('http://gardenia.sanparks.org/webcams/addo.jpg', 'addo/addo_%s.jpg', false),
               new Target('http://gardenia.sanparks.org/webcams/satara.jpg', 'satara/satara_%s.jpg', false)];

var download = function(uri, filename, callback){
    console.log(filename);
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

setInterval(function() {
    targets.forEach(function(target) {
        if (target.enabled) {
            download(target.url, target.baseName.replace('%s', dateFormat(new Date(), 'yyyy-mm-dd_HH.MM.ss')), function() {});
        }
    });
}, 30000);

