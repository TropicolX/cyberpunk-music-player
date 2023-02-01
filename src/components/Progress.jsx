import React from "react";

const Progress = ({
	value,
	onChange,
	onClick,
	onTouchStart,
	onTouchEnd,
	onMouseDown,
	timeElapsed,
	songLength,
}) => {
	return (
		<div className="progress">
			<input
				type="range"
				aria-label="Progress Bar"
				value={value}
				className="progress__barSlider"
				onChange={onChange}
				style={{
					background: `linear-gradient(90deg, var(--primary-color) ${Math.floor(
						value
					)}%, transparent ${Math.floor(value)}%)`,
				}}
				onClick={onClick}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				onMouseDown={onMouseDown}
			/>
			<div className="progress__time">
				<span className="progress__timeElapsed">{timeElapsed}</span>
				<span className="progress__timeLength">{songLength}</span>
			</div>
		</div>
	);
};

export default Progress;
