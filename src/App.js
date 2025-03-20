import React from 'react';
import './App.css';
import 'h8k-components';
import MusicPlayer from '../src/component/musicPlayer';

const title = "HackerMusic";

const App = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <MusicPlayer />
        </div>
    );
}

export default App;