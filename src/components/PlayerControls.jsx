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
	return (
		<div className="playerControls">
			<button onClick={toggleShuffle}>
				<Shuffle
					title="shuffle icon"
					color="var(--primary-color)"
					size={25}
				/>
				{shuffle && <div className="dot" />}
			</button>
			<div className="playerControls__main">
				<button onClick={prev}>
					<SkipStart
						color="var(--primary-color)"
						size={47}
						title="previous icon"
					/>
				</button>
				<button onClick={toggleIsPlaying}>
					{!isPlaying && (
						<PlayCircle
							color="var(--primary-color)"
							size={47}
							title="play icon"
						/>
					)}
					{isPlaying && (
						<PauseCircle
							color="var(--primary-color)"
							size={47}
							title="pause icon"
						/>
					)}
				</button>
				<button onClick={next}>
					<SkipEnd
						color="var(--primary-color)"
						size={47}
						title="next icon"
					/>
				</button>
			</div>
			<button onClick={toggleRepeat}>
				{!repeat && (
					<Repeat
						title="repeat icon"
						color="var(--primary-color)"
						size={25}
					/>
				)}
				{repeat && (
					<Repeat1
						title="repeat icon"
						color="var(--primary-color)"
						size={25}
					/>
				)}
				{repeat && <div className="dot" />}
			</button>
		</div>
	);
};

export default PlayerControls;
