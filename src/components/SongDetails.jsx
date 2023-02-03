import React from "react";
import SongImage from "./SongImage";
import Visualizer from "./Visualizer";

const SongDetails = ({
	song,
	visualizer,
	source,
	analyser,
	currentSongIndex,
}) => {
	return (
		<div className="songDetails">
			<div className="songDetails__imageContainer">
				{!visualizer && <SongImage url={song.image} />}
				{visualizer && (
					<Visualizer
						source={source}
						analyser={analyser}
						currentSongIndex={currentSongIndex}
					/>
				)}
			</div>
			<div className="songDetails__info">
				<h3 className="songDetails__songName">{song.title}</h3>
				<h4 className="songDetails__artistName">{song.artist}</h4>
			</div>
		</div>
	);
};

export default SongDetails;
