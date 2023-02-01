import React from "react";
import SongImage from "./SongImage";

const SongDetails = () => {
	return (
		<div className="songDetails">
			<div className="songDetails__image">
				<SongImage
					url={
						"https://res.cloudinary.com/tropicolx/image/upload/v1675198754/music_app/song-1_hg9de5.jpg"
					}
				/>
			</div>
			<div className="songDetails__info">
				<h3 className="songDetails__songName">song name</h3>
				<h4 className="songDetails__artistName">artist name</h4>
			</div>
		</div>
	);
};

export default SongDetails;
