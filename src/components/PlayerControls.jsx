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
			<button onClick={toggleShuffle}>
				<Shuffle
					title="shuffle icon"
					color={color}
					size={sideControlSize}
				/>
				{shuffle && <div className="dot" />}
			</button>
			<div className="playerControls__main">
				<button onClick={prev}>
					<SkipStart
						color={color}
						size={centerControlSize}
						title="previous icon"
					/>
				</button>
				<button onClick={toggleIsPlaying}>
					{!isPlaying && (
						<PlayCircle
							color={color}
							size={centerControlSize}
							title="play icon"
						/>
					)}
					{isPlaying && (
						<PauseCircle
							color={color}
							size={centerControlSize}
							title="pause icon"
						/>
					)}
				</button>
				<button onClick={next}>
					<SkipEnd
						color={color}
						size={centerControlSize}
						title="next icon"
					/>
				</button>
			</div>
			<button onClick={toggleRepeat}>
				{!repeat && (
					<Repeat
						title="repeat icon"
						color={color}
						size={sideControlSize}
					/>
				)}
				{repeat && (
					<>
						<Repeat1
							title="repeat-one icon"
							color={color}
							size={sideControlSize}
						/>
						<div className="dot" />
					</>
				)}
			</button>
		</div>
	);
};

export default PlayerControls;
