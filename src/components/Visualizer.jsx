import React, { useEffect } from "react";

let width = 310;
let height = 267;

const Visualizer = ({ analyser, source, currentSongIndex }) => {
	useEffect(() => {
		if (!analyser || !source) return;
		const container = document.querySelector("#canvasWrapper");
		const oldCanvas = document.querySelector("#canvasWrapper canvas");
		if (oldCanvas) oldCanvas.remove();

		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		container?.appendChild(canvas);

		let ctx = canvas?.getContext("2d");

		analyser.fftSize = 256;

		let bufferLength = analyser.frequencyBinCount;

		let dataArray = new Uint8Array(bufferLength);

		let barWidth = (width / bufferLength) * 2.5;
		let barHeight;
		let x;

		function renderFrame() {
			requestAnimationFrame(renderFrame);
			x = 0;

			analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "#030816";
			ctx.fillRect(0, 0, width, height);

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];

				let t = i / bufferLength;
				let r = (1 - t) * 255 + t * 2;
				let g = (1 - t) * 238 + t * 215;
				let b = (1 - t) * 8 + t * 242;

				ctx.fillStyle =
					"rgb(" +
					Math.floor(r) +
					"," +
					Math.floor(g) +
					"," +
					Math.floor(b) +
					")";

				ctx.fillRect(x, height - barHeight, barWidth, barHeight);

				x += barWidth + 1;
			}
		}

		renderFrame();
	}, [currentSongIndex, analyser, source]);

	return <div id="canvasWrapper" />;
};

export default Visualizer;
