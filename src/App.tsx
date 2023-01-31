// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SongDetails from "./components/SongDetails";
import Volume from "./components/Volume";

function App() {
	return (
		<div className="app">
			<div className="layout">
				<SongDetails />
				<div className="extraControls">
					<Volume />
					<button className="visualizer" />
				</div>
			</div>
		</div>
	);
}

export default App;
