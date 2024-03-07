const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/routes');
const app = express();
app.use(cors());

app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/subtitles', express.static(__dirname + '/assets/subtitles'));
app.use('/static/pdf', express.static(__dirname + '/assets/pdf'));
app.use(router);

app.listen(5010, () => {
	console.log('Listening on port 5010');
});
