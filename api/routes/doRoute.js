module.exports = function (app) {
    let doController = require('../controller/doController');

    app.route('/uploadFile')
        .post(doController.uploadFile);

    app.route('/dropletDetails')
        .get(doController.dropletDetails);

    app.route('/bestDroplet')
        .get(doController.setMaximumWidthDroplet);

    app.route('/volumeDetails/:volumeId')
        .get(doController.volumeDetails)
};