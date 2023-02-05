import React from "react";
import { Soundwave } from "react-bootstrap-icons";

import Volume from "./Volume";

const ExtraControls = ({
	volume,
	onVolumeChange,
	visualizer,
	toggleVisualizer,
}) => {
	return (
		<div className="extraControls">
			<Volume value={volume} onChange={onVolumeChange} />
			<button aria-label="Visualizer" onClick={toggleVisualizer}>
				<Soundwave color="var(--primary-color)" size={25} />
				{visualizer && <div className="dot" />}
			</button>
		</div>
	);
};

export default ExtraControls;
