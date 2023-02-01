import React, { useState } from "react";
import {
	PauseCircle,
	PlayCircle,
	Repeat,
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
					color={
						shuffle
							? "var(--primary-color)"
							: "rgba(255, 238, 8, 0.6)"
					}
					size={25}
				/>
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
				<Repeat
					title="repeat icon"
					color={
						repeat
							? "var(--primary-color)"
							: "rgba(255, 238, 8, 0.6)"
					}
					size={25}
				/>
			</button>
		</div>
	);
};

export default PlayerControls;
