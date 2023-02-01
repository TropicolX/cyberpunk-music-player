import React, { useState } from "react";

const Progress = () => {
	const [value, setValue] = useState(50);

	return (
		<div className="progress">
			<input
				type="range"
				aria-label="Progress Bar"
				value={value}
				className="progress__barSlider"
				onChange={(e) => setValue(Number(e.target.value))}
				style={{
					background: `linear-gradient(90deg, var(--primary-color) ${Math.floor(
						50
					)}%, transparent ${Math.floor(50)}%)`,
				}}
			/>
			<div className="progress__time">
				<span className="progress__timeElapsed">0:30</span>
				<span className="progress__timeLength">3:45</span>
			</div>
		</div>
	);
};

export default Progress;
