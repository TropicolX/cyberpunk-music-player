import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Volume from "./components/Volume";

import "./App.css";
import SongDetails from "./components/SongDetails";
import Progress from "./components/Progress";
import PlayerControls from "./components/PlayerControls";

const songs = [
	{
		title: "Machinery of War",
		artist: "Evgeny Bardyuzha",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675198754/music_app/song-1_hg9de5.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218409/music_app/Evgeny_Bardyuzha_-_Machinery_of_War_fyaroh.mp3",
	},
	{
		title: "Nova",
		artist: "2050",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675198988/music_app/song-2_cpedns.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218406/music_app/2050_-_Nova_jp2ila.mp3",
	},
	{
		title: "Medusa",
		artist: "Kryptos",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675198993/music_app/song-3_vssxk7.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218402/music_app/Kryptos_-_Medusa_yyj3nc.mp3",
	},
	{
		title: "Artificial Intelligence",
		artist: "Lance Conrad",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675198999/music_app/song-4_pxxo1j.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218398/music_app/Lance_Conrad_-_Artificial_Intelligence_ioozhh.mp3",
	},
];

function App() {
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [songLength, setSongLength] = useState(0);
	const [songFinished, setSongFinished] = useState(false);
	const [volume, setVolume] = useState(0.7);
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState(false);
	const audioRef = useRef();

	const setTimeUpdate = () => {
		const currentTime = audioRef.current.currentTime;
		const progress = currentTime
			? Number(
					((currentTime * 100) / audioRef.current.duration).toFixed(1)
			  )
			: 0;
		setTimeElapsed(currentTime);
		setProgress(progress);
	};

	const updateCurrentTime = (value) => {
		const currentTime = (value * audioRef.current.duration) / 100;
		audioRef.current.currentTime = currentTime;
	};

	const setLoadedData = async () => {
		setTimeElapsed(audioRef.current.currentTime);
		setSongLength(audioRef.current.duration);
	};

	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	useEffect(() => {
		if (songFinished) {
			if (repeat) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
			} else {
				next();
			}
			setSongFinished(false);
		}
	}, [songFinished]);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	const play = async () => {
		await audioRef.current.load();
		setIsPlaying(true);
		audioRef.current.play();
	};

	const next = async () => {
		setCurrentSongIndex((currentIndex) => {
			const nextIndex = currentIndex + 1;
			const newIndex = nextIndex > songs.length - 1 ? 0 : nextIndex;
			return newIndex;
		});
		play();
	};

	const prev = () => {
		setCurrentSongIndex((currentIndex) => {
			const prevIndex = currentIndex - 1;
			const newIndex = prevIndex < 0 ? songs.length - 1 : prevIndex;
			return newIndex;
		});
		play();
	};

	const toggleIsPlaying = () => {
		setIsPlaying((isPlaying) => !isPlaying);
	};

	// convert seconds to minutes and seconds in the format of mm:ss
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);
		return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
	};

	return (
		<div className="app">
			<audio
				src={songs[currentSongIndex].src}
				ref={audioRef}
				onTimeUpdate={setTimeUpdate}
				onLoadedData={setLoadedData}
				onEnded={() => setSongFinished(true)}
			></audio>
			<div className="layout">
				<SongDetails song={songs[currentSongIndex]} />
				<div className="extraControls">
					<Volume
						value={volume * 100}
						onChange={(e) =>
							setVolume(Number(e.target.value) / 100)
						}
					/>
					<button className="visualizer" />
				</div>
				<Progress
					value={progress}
					onChange={(e) => {
						updateCurrentTime(e.target.value);
					}}
					onTouchStart={() => setIsPlaying(false)}
					onMouseDown={() => setIsPlaying(false)}
					onClick={() => setIsPlaying(true)}
					onTouchEnd={() => setIsPlaying(true)}
					timeElapsed={formatTime(timeElapsed)}
					songLength={formatTime(songLength)}
				/>
				<PlayerControls
					next={next}
					prev={prev}
					isPlaying={isPlaying}
					toggleIsPlaying={toggleIsPlaying}
					shuffle={shuffle}
					toggleShuffle={() => setShuffle((shuffle) => !shuffle)}
					repeat={repeat}
					toggleRepeat={() => setRepeat((repeat) => !repeat)}
				/>
			</div>
		</div>
	);
}

export default App;
