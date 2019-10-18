const multer = require('multer');
var moment   = require('moment');
var myDate   = new Date();
var date     = moment(myDate).format('lll');

//Storage the folder functionality
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'uploads/')
    },
    filename: function(req, file, cd) {
        cd(null, date + file.originalname)
    }
})

//upload the file function
var upload = multer({
    storage: storage
}).any('');

//================== file_upload =========================
//post

module.exports.file_upload = (req, res) => {
    upload(req, res, function(err) {
        if(err) {
            res.json(err)
        }else {
            var imagename = req.files;
            const map1 = imagename.map(data => {
                var imageurl ="https://pink-panther.herokuapp.com/"+date+data.originalname;
                res.json({
                    "success": true,
                    "message": 'Image uploaded',
                    "imageurl": imageurl
                })
            })
        }
    })
}
