import React, { useEffect, useRef, useState } from "react";

import "../styles/Volume.css";

const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
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
			return (
				<svg
					width={30}
					height={30}
					viewBox="0 0 30 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.5985 6.09254C12.9233 6.24865 13.1299 6.57713 13.1299 6.93751V21.9375C13.1299 22.2979 12.9233 22.6264 12.5985 22.7825C12.2737 22.9386 11.8881 22.8947 11.6067 22.6696L7.17603 19.125H2.81738C2.29962 19.125 1.87988 18.7053 1.87988 18.1875V10.6875C1.87988 10.1697 2.29962 9.75001 2.81738 9.75001H7.17603L11.6067 6.20544C11.8881 5.98032 12.2737 5.93642 12.5985 6.09254ZM11.2549 8.88809L8.09053 11.4196C7.9243 11.5526 7.71776 11.625 7.50488 11.625H3.75488V17.25H7.50488C7.71776 17.25 7.9243 17.3225 8.09053 17.4554L11.2549 19.9869V8.88809Z"
						fill="#FFEE08"
					/>
				</svg>
			);
		} else if (volume < 53) {
			return (
				<svg
					width={30}
					height={30}
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.1299 7.50001C13.1299 7.13963 12.9233 6.81115 12.5985 6.65504C12.2737 6.49892 11.8881 6.54282 11.6067 6.76794L7.17603 10.3125H2.81738C2.29962 10.3125 1.87988 10.7322 1.87988 11.25V18.75C1.87988 19.2678 2.29962 19.6875 2.81738 19.6875H7.17603L11.6067 23.2321C11.8881 23.4572 12.2737 23.5011 12.5985 23.345C12.9233 23.1889 13.1299 22.8604 13.1299 22.5V7.50001ZM8.09053 11.9821L11.2549 9.45059V20.5494L8.09053 18.0179C7.9243 17.885 7.71776 17.8125 7.50488 17.8125H3.75488V12.1875H7.50488C7.71776 12.1875 7.9243 12.1151 8.09053 11.9821Z"
						fill="#FFEE08"
					/>
					<path
						d="M18.802 15C18.802 17.3299 17.8576 19.4393 16.3307 20.9662L15.0049 19.6403C16.1925 18.4528 16.927 16.8121 16.927 15C16.927 13.1878 16.1925 11.5471 15.0049 10.3596L16.3307 9.03374C17.8576 10.5606 18.802 12.67 18.802 15Z"
						fill="#FFEE08"
					/>
				</svg>
			);
		}
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={30}
				height={30}
				fill="none"
			>
				<path
					d="M21.629 26.27c2.884-2.884 4.668-6.869 4.668-11.27s-1.784-8.385-4.668-11.269l-1.326 1.326c2.545 2.545 4.119 6.06 4.119 9.944s-1.574 7.399-4.119 9.944l1.326 1.326z"
					fill="#fff"
					fillOpacity={0}
				/>
				<path
					d="M18.978 23.618A12.15 12.15 0 0 0 22.547 15a12.15 12.15 0 0 0-3.57-8.618l-1.326 1.326A10.28 10.28 0 0 1 20.672 15a10.28 10.28 0 0 1-3.021 7.292l1.326 1.326zM18.797 15a8.41 8.41 0 0 1-2.471 5.966L15 19.64A6.54 6.54 0 0 0 16.922 15 6.54 6.54 0 0 0 15 10.36l1.326-1.326A8.41 8.41 0 0 1 18.797 15zm-5.672-7.5a.94.94 0 0 0-1.523-.732l-4.431 3.545H2.813a.94.94 0 0 0-.937.938v7.5a.94.94 0 0 0 .938.938h4.359l4.431 3.545a.94.94 0 0 0 1.523-.732v-15zm-5.039 4.482L11.25 9.45v11.099l-3.164-2.531c-.166-.133-.373-.205-.586-.205H3.75v-5.625H7.5a.94.94 0 0 0 .586-.205z"
					fill="#ffee08"
				/>
			</svg>
		);
	};

	return (
		<div ref={divRef} className="volumeContainer">
			<button onClick={toggleIsOpen} tabIndex={0} aria-label="Volume">
				<div className="volume__icon">{getVolumeSvg(value)}</div>
			</button>
			{isOpen && (
				<div className="volume">
					<div className="volume__sliderContainer">
						<input
							type="range"
							aria-label="Volume slider"
							value={value}
							min="0"
							max="100"
							className="volume__slider"
							onChange={onChange}
						/>
						<svg
							width={54}
							height={150}
							viewBox="0 0 54 150"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.09434 111H0.999996V149H53V1H12.6352L6.82795 6.69967L0.999996 12.8964V82H5.09434H6.09434V83V110V111H5.09434Z"
								fill="#040C1F"
								stroke="#FFEE08"
								strokeWidth={2}
							/>
						</svg>
					</div>
				</div>
			)}
		</div>
	);
};

export default Volume;
