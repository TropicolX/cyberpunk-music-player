import React from "react";
import {
	PauseCircle,
	PlayCircle,
	Repeat,
	Repeat1,
	Shuffle,
	SkipEnd,
	SkipStart,
} from "react-bootstrap-icons";

import "../styles/PlayerControls.css";

const PlayerControls = ({
	isPlaying,
	toggleIsPlaying,
	prev,
	next,
	repeat,
	toggleRepeat,
	shuffle,
	toggleShuffle,
}) => {
	const centerControlSize = 47;
	const sideControlSize = 25;
	const color = "var(--primary-color)";

	return (
		<div className="playerControls">
			<button
				aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
				className="shuffle"
				onClick={toggleShuffle}
			>
				<Shuffle color={color} size={sideControlSize} />
				{shuffle && <div className="dot" />}
			</button>
			<div className="playerControls__main">
				<button aria-label="Previous" onClick={prev}>
					<SkipStart color={color} size={centerControlSize} />
				</button>
				<button
					aria-label={isPlaying ? "Pause" : "Play"}
					onClick={toggleIsPlaying}
				>
					{!isPlaying && (
						<PlayCircle color={color} size={centerControlSize} />
					)}
					{isPlaying && (
						<PauseCircle color={color} size={centerControlSize} />
					)}
				</button>
				<button aria-label="Next" onClick={next}>
					<SkipEnd color={color} size={centerControlSize} />
				</button>
			</div>
			<button
				aria-label={repeat ? "Disable repeat" : "Enable repeat"}
				onClick={toggleRepeat}
			>
				{!repeat && <Repeat color={color} size={sideControlSize} />}
				{repeat && (
					<>
						<Repeat1 color={color} size={sideControlSize} />
						<div className="dot" />
					</>
				)}
			</button>
		</div>
	);
};

export default PlayerControls;
