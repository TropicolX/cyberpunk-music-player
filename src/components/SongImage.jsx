import React, { useState, useEffect, useRef } from "react";

const SongImage = ({ url }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const imageRef = useRef(null);
	const useEl = useRef(null);

	useEffect(() => {
		setImageLoaded(false);
		if (!imageRef.current) return;
		imageRef.current.setAttribute("href", url);
		imageRef.current.onload = () => setImageLoaded(true);
		// <- call this in an onUpdate
		// if (useEl.current) {
		// 	useEl.current.setAttribute("xlink:href", "");
		// 	useEl.current.setAttribute("xlink:href", "#image0_254_11");
		// }
	}, [imageRef, url]);

	return (
		<svg
			width="310"
			height="267"
			viewBox="0 0 310 267"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<g clipPath="url(#clip0_254_11)">
				<path
					d="M273.651 266.399L309.429 229.84C309.795 229.466 310 228.964 310 228.441V2.34701C310 1.2434 309.106 0.348373 308.002 0.34701L27.6036 0.000835899C27.1645 0.000293745 26.7374 0.144299 26.3882 0.410626L0.787054 19.9381C0.291064 20.3164 0 20.9045 0 21.5283V265C0 266.105 0.895431 267 2 267H40.735H272.221C272.759 267 273.274 266.783 273.651 266.399Z"
					fill="url(#pattern0)"
					stroke="#FFEE08"
					strokeWidth="2"
				/>
				<line
					x1="17"
					y1="1"
					x2="1"
					y2="1"
					stroke="#FFEE08"
					strokeWidth="2"
					strokeLinecap="square"
				/>
				<line
					x1="0.285156"
					y1="12"
					x2="0.285157"
					y2="1"
					stroke="#FFEE08"
					strokeWidth="2"
					strokeLinecap="square"
				/>
				<path
					d="M295.817 266.915C295.655 267.079 295.441 267.182 295.211 267.206L284.743 268.315C283.813 268.413 283.269 267.296 283.92 266.624L309.712 240.013C310.363 239.341 311.498 239.851 311.427 240.784L310.603 251.633C310.585 251.87 310.484 252.092 310.317 252.261L295.817 266.915Z"
					fill="#FFEE08"
				/>
			</g>
			<defs>
				<pattern
					id="pattern0"
					patternContentUnits="objectBoundingBox"
					width="1"
					height="1"
				>
					<use
						ref={useEl}
						xlinkHref={
							imageLoaded ? "#image0_254_11" : "#image0_254_12"
						}
						transform="matrix(0.000390625 0 0 0.000453535 0 -0.0805243)"
					/>
				</pattern>
				<clipPath id="clip0_254_11">
					<rect width="310" height="267" fill="white" />
				</clipPath>
				<image
					id="image0_254_11"
					width="2560"
					height="2560"
					ref={imageRef}
					opacity={imageLoaded ? "1" : "0"}
					className="songDetails__image"
					attributeName="song image"
				/>
				<image
					id="image0_254_12"
					width="2560"
					height="2560"
					xlinkHref="https://res.cloudinary.com/tropicolx/image/upload/v1675211310/music_app/default-song-image_tmekey.svg"
					attributeName="default song image"
				/>
			</defs>
		</svg>
	);
};

export default SongImage;
