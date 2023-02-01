import React from "react";
import SongImage from "./SongImage";

const SongDetails = ({ song }) => {
	return (
		<div className="songDetails">
			<div className="songDetails__image">
				<SongImage url={song.image} />
			</div>
			<div className="songDetails__info">
				<h3 className="songDetails__songName">{song.title}</h3>
				<h4 className="songDetails__artistName">{song.artist}</h4>
			</div>
		</div>
	);
};

export default SongDetails;
