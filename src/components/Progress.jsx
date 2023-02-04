import React from "react";

import "../styles/Progress.css";

const Progress = ({
	value,
	onChange,
	progressSeekStart,
	progressSeekEnd,
	timeElapsed,
	songLength,
}) => {
	return (
		<div className="progress">
			<input
				type="range"
				aria-label="Progress Bar"
				value={value}
				min="0"
				max="100"
				className="progress__barSlider"
				onChange={onChange}
				style={{
					background: `linear-gradient(90deg, var(--primary-color) ${Math.ceil(
						value
					)}%, transparent ${Math.ceil(value)}%)`,
				}}
				onTouchStart={progressSeekStart}
				onMouseDown={progressSeekStart}
				onTouchEnd={progressSeekEnd}
				onClick={progressSeekEnd}
			/>
			<div className="progress__time">
				<span className="progress__timeElapsed">{timeElapsed}</span>
				<span className="progress__timeLength">{songLength}</span>
			</div>
		</div>
	);
};

export default Progress;
