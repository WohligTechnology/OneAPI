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
            windowSize: {
                width: 975,
                height: 1500
            }
        };
        var renderStream = sails.webshot("http://admin.myfynx.com/index2.php/#/" + req.query.url, options);
        renderStream.on('data', function(data) {
            res.send(data);
        });
    }
};
