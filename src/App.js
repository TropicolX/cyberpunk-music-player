import React, { useEffect, useRef, useState } from "react";
import { Soundwave } from "react-bootstrap-icons";

import ExtraControls from "./components/ExtraControls";
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

class AudioAnalyser {
	constructor(audioElement, context, source) {
		this.context =
			context || new (window.AudioContext || window.webkitAudioContext)();
		this.source =
			source || this.context.createMediaElementSource(audioElement);
		this.analyserNode = this.context.createAnalyser();
		this.source.connect(this.analyserNode);
		this.analyserNode.connect(this.context.destination);
	}
}

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
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [shuffledPlaylist, setShuffledPlaylist] = useState(songs);
	const [analyser, setAnalyser] = useState(null);

	const playSong = async () => {
		await analyser.context.resume();
		setIsPlaying(true);
		await audioRef.current.play();
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
		const audio = audioRef.current;
		const currentTime = audio.currentTime;
		const progress = currentTime
			? Number(((currentTime * 100) / audio.duration).toFixed(1))
			: 0;
		setTimeElapsed(currentTime);
		!dragging && setProgress(progress);
	};

	const setLoadedData = async () => {
		const audio = audioRef.current;
		setAnalyser((prevAnalyser) => {
			return new AudioAnalyser(
				audio,
				prevAnalyser?.context,
				prevAnalyser?.source
			);
		});
		setTimeElapsed(audio.currentTime);
		setSongLength(audio.duration);
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
		const audio = audioRef.current;
		const currentTime = (value * audio.duration) / 100;
		audio.currentTime = currentTime;
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

	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	useEffect(() => {
		if (songFinished) {
			if (!repeat) next();
			setSongFinished(false);
		}
	}, [songFinished]);

	useEffect(() => {
		const playOrPause = async () => {
			if (isPlaying) {
				await analyser?.context?.resume();
				await audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		};

		playOrPause();
	}, [isPlaying, analyser?.context]);

	useEffect(() => {
		if (shuffle) shufflePlaylist();
	}, [shuffle]);

	return (
		<div className="app">
			<audio
				src={playlist[currentSongIndex].src}
				ref={audioRef}
				onTimeUpdate={setTimeUpdate}
				onLoadedData={setLoadedData}
				onEnded={() => setSongFinished(true)}
				loop={repeat}
				crossOrigin="anonymous"
			></audio>
			<div className="layout">
				<SongDetails
					visualizer={visualizer}
					source={analyser?.source}
					analyser={analyser?.analyserNode}
					currentSongIndex={currentSongIndex}
					song={playlist[currentSongIndex]}
				/>
				<ExtraControls>
					<Volume
						value={volume * 100}
						onChange={(e) =>
							setVolume(Number(e.target.value) / 100)
						}
					/>
					<button
						aria-label="Visualizer"
						onClick={() => setVisualizer((prev) => !prev)}
					>
						<Soundwave color="var(--primary-color)" size={25} />
						{visualizer && <div className="dot" />}
					</button>
				</ExtraControls>
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
					next={next}
					prev={prev}
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
