import React, { useEffect, useRef, useState } from "react";

const Volume = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [volume, setVolume] = useState(0);

	const ref = useRef(null);

	useEffect(() => {
		const listener = (event) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			setIsOpen(false);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, setIsOpen]);

	const getVolumeSvg = (volume) => {
		if (volume === 0) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207852/music_app/volume-off_vneq1y.svg')";
		} else if (volume < 53) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207848/music_app/volume-down_o0efg7.svg')";
		}
		return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675208384/music_app/volume-up_v1f6ne.svg')";
	};

	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<button className="volume" onClick={handleClick}>
			<div
				style={{
					background: getVolumeSvg(volume),
				}}
				className="volume__icon"
			></div>
			{isOpen && (
				<>
					<div ref={ref} className="volume__barContainer">
						<div className="volume__bar">
							<input
								type="range"
								aria-label="Volume"
								value={volume}
								min="0"
								max="100"
								className="volume__barSlider"
								onChange={(e) =>
									setVolume(Number(e.target.value))
								}
							/>
						</div>
					</div>
					<div className="volume__iconOverlay"></div>
				</>
			)}
		</button>
	);
};

export default Volume;
