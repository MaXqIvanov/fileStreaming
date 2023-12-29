const express = require('express');
const cors = require('cors');
const router = require('./video/Video');
const app = express();
app.use(cors());

app.use(router);

app.listen(5010, () => {
	console.log('Listening on port 5010');
});
