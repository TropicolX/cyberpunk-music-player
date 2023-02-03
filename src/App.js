import React, { useEffect, useRef, useState } from "react";
import { Soundwave } from "react-bootstrap-icons";

import PlayerControls from "./components/PlayerControls";
import Progress from "./components/Progress";
import SongDetails from "./components/SongDetails";
import Volume from "./components/Volume";

const songs = [
	{
		id: 0,
		title: "Machinery of War",
		artist: "Evgeny Bardyuzha",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675352152/music_app/machinery-of-war_fqu8z6.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218409/music_app/Evgeny_Bardyuzha_-_Machinery_of_War_fyaroh.mp3",
	},
	{
		id: 1,
		title: "Nova",
		artist: "2050",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351835/music_app/song-2_ljg2wd.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218406/music_app/2050_-_Nova_jp2ila.mp3",
	},
	{
		id: 2,
		title: "Medusa",
		artist: "Kryptos",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351585/music_app/song-3_ppgsaf.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218402/music_app/Kryptos_-_Medusa_yyj3nc.mp3",
	},
	{
		id: 3,
		title: "Artificial Intelligence",
		artist: "Lance Conrad",
		image: "https://res.cloudinary.com/tropicolx/image/upload/v1675351701/music_app/song-4_yaqewe.jpg",
		src: "https://res.cloudinary.com/tropicolx/video/upload/v1675218398/music_app/Lance_Conrad_-_Artificial_Intelligence_ioozhh.mp3",
	},
];

function App() {
	const audioRef = useRef();
	const [playlist, setPlaylist] = useState(songs);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [songLength, setSongLength] = useState(0);
	const [songFinished, setSongFinished] = useState(false);
	const [volume, setVolume] = useState(0.7);
	const [visualizer, setVisualizer] = useState(false);
	const [context, setContext] = useState(null);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [shuffledPlaylist, setShuffledPlaylist] = useState(songs);
	const [source, setSource] = useState(null);
	const [analyser, setAnalyser] = useState(null);

	useEffect(() => {
		if (!audioRef.current || window === undefined) return;

		const AudioContext = window.AudioContext || window.webkitAudioContext;
		var ctx = new AudioContext();
		setContext(ctx);
		let src = ctx.createMediaElementSource(audioRef.current);
		setSource(src);
		let analyserNode = ctx.createAnalyser();
		setAnalyser(analyserNode);

		src.connect(analyserNode);
		analyserNode.connect(ctx.destination);
	}, []);

	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	useEffect(() => {
		if (songFinished) {
			if (repeat) {
				repeatSong();
			} else {
				next();
			}
			setSongFinished(false);
		}
	}, [songFinished]);

	useEffect(() => {
		const playOrPause = async () => {
			if (isPlaying) {
				await context.resume();
				await audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		};

		playOrPause();
	}, [isPlaying, context]);

	useEffect(() => {
		if (shuffle) shufflePlaylist();
	}, [shuffle]);

	const repeatSong = () => {
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	};

	const playSong = async () => {
		await context.resume();
		setIsPlaying(true);
		audioRef.current.play();
	};

	const shufflePlaylist = () => {
		setShuffledPlaylist((playlist) => {
			if (playlist.length === 1) return playlist;

			const newPlaylist = playlist.filter(
				(song) => song.id !== playlist[currentSongIndex].id
			);

			let shuffledPlaylist = newPlaylist.sort(() => Math.random() - 0.5);

			shuffledPlaylist = [
				playlist[currentSongIndex],
				...shuffledPlaylist,
			];
			return shuffledPlaylist;
		});
	};

	const setTimeUpdate = () => {
		const currentTime = audioRef.current.currentTime;
		const progress = currentTime
			? Number(
					((currentTime * 100) / audioRef.current.duration).toFixed(1)
			  )
			: 0;
		setTimeElapsed(currentTime);
		!dragging && setProgress(progress);
	};

	const setLoadedData = async () => {
		setTimeElapsed(audioRef.current.currentTime);
		setSongLength(audioRef.current.duration);
	};

	const next = () => {
		const currentSongId = playlist[currentSongIndex].id;
		const newPlaylist = shuffle ? shuffledPlaylist : songs;
		setPlaylist(newPlaylist);
		setCurrentSongIndex(() => {
			const currentSongIndex = newPlaylist.findIndex(
				(song) => song.id === currentSongId
			);
			const nextIndex = currentSongIndex + 1;
			const newIndex = nextIndex > newPlaylist.length - 1 ? 0 : nextIndex;
			return newIndex;
		});
		playSong();
	};

	const prev = () => {
		const currentSongId = playlist[currentSongIndex].id;
		const newPlaylist = shuffle ? shuffledPlaylist : songs;
		setPlaylist(newPlaylist);
		setCurrentSongIndex(() => {
			const currentSongIndex = newPlaylist.findIndex(
				(song) => song.id === currentSongId
			);
			const prevIndex = currentSongIndex - 1;
			const newIndex = prevIndex < 0 ? newPlaylist.length - 1 : prevIndex;
			return newIndex;
		});
		playSong();
	};

	const updateCurrentTime = (value) => {
		const currentTime = (value * audioRef.current.duration) / 100;
		audioRef.current.currentTime = currentTime;
	};

	const progressSeekEnd = (e) => {
		updateCurrentTime(e.target.value);
		setDragging(false);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);
		return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
	};

	return (
		<div className="app">
			<audio
				src={playlist[currentSongIndex].src}
				ref={audioRef}
				onTimeUpdate={setTimeUpdate}
				onLoadedData={setLoadedData}
				onEnded={() => setSongFinished(true)}
				crossOrigin="anonymous"
			></audio>
			<div className="layout">
				<SongDetails
					visualizer={visualizer}
					source={source}
					analyser={analyser}
					currentSongIndex={currentSongIndex}
					song={playlist[currentSongIndex]}
				/>
				<div className="volumeAndVisualizer">
					<Volume
						value={volume * 100}
						onChange={(e) =>
							setVolume(Number(e.target.value) / 100)
						}
					/>
					<button onClick={() => setVisualizer((prev) => !prev)}>
						<Soundwave
							color="var(--primary-color)"
							size={30}
							title="visualizer button"
						/>
					</button>
				</div>
				<Progress
					value={progress}
					onChange={(e) => {
						setProgress(Number(e.target.value));
					}}
					progressSeekStart={() => setDragging(true)}
					progressSeekEnd={progressSeekEnd}
					timeElapsed={formatTime(timeElapsed)}
					songLength={formatTime(songLength)}
				/>
				<PlayerControls
					next={repeat ? repeatSong : next}
					prev={repeat ? repeatSong : prev}
					isPlaying={isPlaying}
					toggleIsPlaying={() =>
						setIsPlaying((isPlaying) => !isPlaying)
					}
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
