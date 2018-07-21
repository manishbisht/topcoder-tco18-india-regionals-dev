const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//importing route
let routes = require('./routes/doRoute');
//register the route
routes(app);

app.listen(8000, () => console.log('TCO18 API is listening on port 8000!'));