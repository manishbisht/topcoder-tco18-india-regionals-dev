let DigitalOcean = require('do-wrapper').default;
let doApi = new DigitalOcean('0dfaa3713ee6db7e4ceb6bbbd5b22e36f7eeaf6eae811e8324c453ec20d6a9ee');
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'tco18-india',
        acl: 'public-read',
        key: function (request, file, cb) {
            cb(null, file.originalname);
        }
    })
}).array('file', 1);

exports.dropletDetails = function(req, res) {
    doApi.dropletsGetById(102657397).then((response) => {
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });
};

exports.uploadFile = function (request, response) {
    upload(request, response, function (error) {
        if (error) {
            response.send({message: error});
        }
        response.send({message: 'File uploaded successfully.'});
    });
};

exports.setMaximumWidthDroplet = function(req, res) {
    doApi.dropletsGetAll({}).then((response) => {
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });
};

exports.volumeDetails = function(req, res) {
    doApi.volumesGetById(req.params.volumeId).then((response) => {
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });
};