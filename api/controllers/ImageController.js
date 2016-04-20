/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    myFynx: function(req, res) {
        var options = {
            siteType: 'url',
            renderDelay: 3000,
            windowSize: {
                width: 975,
                height: 1500
            }
        };
        var split = req.query.url.split("/");
        var path = "./uploads/" + split[1] + ".jpg";
        var isfile = sails.fs.existsSync(path);
        if (isfile == false) {
            console.log("in if");
            sails.webshot("http://admin.myfynx.com/index2.php/#/" + req.query.url, path, options, function(err) {
                if (err) {
                    console.log(err);
                    res.json({
                        value: false,
                        comment: err
                    });
                } else {
                    var image = sails.fs.readFileSync(path);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + path);
                    res.send(image);
                }
            });
        } else {
            console.log("in else");
            var image = sails.fs.readFileSync(path);
            res.set('Content-Type', "application/octet-stream");
            res.set('Content-Disposition', "attachment;filename=" + path);
            res.send(image);
        }
    }
};
