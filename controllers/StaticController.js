const fs = require('fs');
const path = require('path');

class StaticController {
	getVideo(req, res) {
		const videoPath = `assets/${req.params.id.includes('.') ? req.params.id : req.params.id + '.mp4'}`;
		const videoStat = fs.statSync(videoPath);
		const fileSize = videoStat.size;
		const videoRange = req.headers.range;
		if (videoRange) {
			const parts = videoRange.replace(/bytes=/, '').split('-');
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
			const chunksize = end - start + 1;
			const file = fs.createReadStream(videoPath, { start, end });
			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mp4'
			};
			res.writeHead(206, head);
			file.pipe(res);
		} else {
			const head = {
				'Content-Length': fileSize,
				'Content-Type': 'video/mp4'
			};
			res.writeHead(200, head);
			fs.createReadStream(videoPath).pipe(res);
		}
	}

	getImage(req, res) {
		const imagePath = `../assets/images/${req.params.id}`;
		res.sendFile(path.join(__dirname, imagePath));
	}
}

module.exports = new StaticController();
