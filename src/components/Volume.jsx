import React, { useEffect, useRef, useState } from "react";

import "../styles/Volume.css";

const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			console.log("inside useOnClickOutside");
			handler(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

const Volume = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const divRef = useRef(null);
	useOnClickOutside(divRef, () => setIsOpen(false));

	const toggleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const getVolumeSvg = (volume) => {
		if (volume === 0) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207852/music_app/volume-off_vneq1y.svg')";
		} else if (volume < 53) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207848/music_app/volume-down_o0efg7.svg')";
		}
		return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675208384/music_app/volume-up_v1f6ne.svg')";
	};

	return (
		<div ref={divRef} className="volumeContainer">
			<button
				onClick={toggleIsOpen}
				className="volume"
				tabIndex={0}
				aria-label="Volume"
			>
				<div
					style={{
						background: getVolumeSvg(value),
					}}
					className="volume__icon"
				></div>
			</button>
			{isOpen && (
				<div className="volume__barContainer">
					<div className="volume__bar">
						<input
							type="range"
							aria-label="Volume"
							value={value}
							min="0"
							max="100"
							className="volume__barSlider"
							onChange={onChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Volume;
