import React, {useEffect, useState} from 'react';
import './musicPlayer.css';

import data from '../data.json';

function CurrentlyRunningMusic({ song, onPlayPause, onNext, onPrevious, isPlaying } ) {
    const { name , image} = song;
    const playButtonImage = `/Images/${isPlaying ? 'pause' : 'play'}.jpg`;

    return (
        <div data-testid="main-music-box" className="main-music-box">
            <img className="main-music-img" alt='Default Music' src={image}/>
            <p>{name}</p>
            <div className='all-logos'>
                <img data-testid="backward-logo" alt='backward-logo' className='logos' onClick={onPrevious} src={'/Images/backward.jpg'}/>
                <img data-testid="play-pause-logo" alt='play-pause-logo' className='logos' onClick={onPlayPause} src={playButtonImage}/>
                <img data-testid="forward-logo" className='logos' alt='forward-logo' onClick={onNext} src={'/Images/forward.jpg'}/>
            </div>
        </div>
    )
}

function MusicPreview({ name, image, isSelected = false}) {
    const className = `music-box ${isSelected ? 'selected' : ''}`

    return (
        <div
            data-testid="music-box"
            className={className}
        >
            <img alt='Music 1' src={image}/>
        </div>
    )
}

function CustomPrompt({ song, onClose }) {
    const { name } = song;

    return (
        <div data-testid="custom-prompt" className="custom-prompt">
            <p>Now playing: {name}</p>
            <button data-testid="close-button" onClick={onClose}>Close</button>
        </div>
    )
}

const MusicPlayer = () => {
    const [songs, setSongs] = useState(() => data);
    const [currentRunningSongIndex, setCurrentRunningSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showPrompt, setShowPrompt] = useState(true);

    useEffect(() => {
        let timer;

        if(isPlaying) {
            timer = setTimeout(() => {
                setCurrentRunningSongIndex((currentRunningSongIndex + 1) % songs.length);
                setShowPrompt(true);
            }, 4000);
        }

        return () => clearInterval(timer);
    }, [isPlaying, currentRunningSongIndex, songs.length]);

    const onPlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const onNext = () => {
        setCurrentRunningSongIndex((currentRunningSongIndex + 1) % songs.length);
    }

    const onPrevious = () => {
        const newIndex = currentRunningSongIndex - 1 < 0 ? songs.length - 1 : currentRunningSongIndex - 1;

        setCurrentRunningSongIndex(newIndex % songs.length);
    }

    const onClose = () => {
        setShowPrompt(false);
    }

    return (
        <div className="music-player-container">
            <CurrentlyRunningMusic
                song={songs[currentRunningSongIndex]}
                onPlayPause={onPlayPause}
                onNext={onNext}
                onPrevious={onPrevious}
                isPlaying={isPlaying}
            />
            <div className="music-boxes">
                {songs.map((song, index) =>
                    <MusicPreview
                        key={index}
                        name={song.name}
                        image={song.image}
                        isSelected={index === currentRunningSongIndex}
                    />
                )}
            </div>
            {showPrompt && <CustomPrompt song={songs[currentRunningSongIndex]} onClose={onClose} />}
        </div>
    );
};

export default MusicPlayer;
