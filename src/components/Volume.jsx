import React, { useRef, useState } from "react";

const Volume = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	const getVolumeSvg = (volume) => {
		if (volume === 0) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207852/music_app/volume-off_vneq1y.svg')";
		} else if (volume < 53) {
			return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675207848/music_app/volume-down_o0efg7.svg')";
		}
		return "url('https://res.cloudinary.com/tropicolx/image/upload/v1675208384/music_app/volume-up_v1f6ne.svg')";
	};

	const onBlur = (event) => {
		if (ref.current && !ref.current.contains(event.relatedTarget)) {
			setIsOpen(false);
		}
	};

	return (
		<button
			className="volume"
			tabIndex={0}
			onFocus={() => setIsOpen(true)}
			onBlur={onBlur}
		>
			<div
				style={{
					background: getVolumeSvg(value),
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
								value={value}
								min="0"
								max="100"
								className="volume__barSlider"
								onChange={onChange}
							/>
						</div>
					</div>
					<div
						onMouseDown={() => setIsOpen(false)}
						className="volume__iconBlocker"
					></div>
				</>
			)}
		</button>
	);
};

export default Volume;
