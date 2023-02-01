import React, { useState } from "react";
import {
	PlayCircle,
	Repeat,
	Shuffle,
	SkipEnd,
	SkipStart,
} from "react-bootstrap-icons";

const PlayerControls = () => {
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState(false);

	return (
		<div className="playerControls">
			<button onClick={() => setShuffle((prev) => !prev)}>
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
				<button>
					<SkipStart
						color="var(--primary-color)"
						size={47}
						title="previous icon"
					/>
				</button>
				<button>
					<PlayCircle
						color="var(--primary-color)"
						size={47}
						title="play icon"
					/>
				</button>
				<button>
					<SkipEnd
						color="var(--primary-color)"
						size={47}
						title="next icon"
					/>
				</button>
			</div>
			<button onClick={() => setRepeat((prev) => !prev)}>
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
