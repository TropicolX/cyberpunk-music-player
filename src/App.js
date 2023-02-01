import React, { useState } from "react";
import Volume from "./components/Volume";

import "./App.css";
import SongDetails from "./components/SongDetails";
import Progress from "./components/Progress";
import PlayerControls from "./components/PlayerControls";

function App() {
	return (
		<div className="app">
			<div className="layout">
				{/** Song Details */}
				<SongDetails />
				{/** Secondary Controls */}
				<div className="extraControls">
					<Volume />
					<button className="visualizer" />
				</div>
				{/** Progress Bar */}
				<Progress />
				{/** Main Controls */}
				<PlayerControls />
			</div>
		</div>
	);
}

export default App;
