import React from 'react';
import App from './App';
import { render, fireEvent, waitFor, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import musicData from '../src/data.json';

describe('Music Player Component', () => {
  let app;

  beforeEach(() => {
    app = render(<App />);
  });
  
  afterEach(() => {
      cleanup();
  });

  it('imports data properly', () => {
    const musicBoxes = screen.getAllByTestId('music-box');
    const mainMusicBox = screen.getByTestId('main-music-box');

    const expectedImageSources = musicData.map((music) => music.image);

    for (let i = 0; i < musicData.length; i++) {
      const img = musicBoxes[i].querySelector('img');
      expect(img).toHaveAttribute('src', expectedImageSources[i]);
    }
  
    expect(mainMusicBox).toBeInTheDocument();
  });

  it('changes selected box every 4 seconds', async () => {
    const initialBox = await screen.findByTestId('main-music-box');
    const initialBoxName = musicData[0].name;

    await waitFor(() => expect(initialBox).toHaveTextContent(initialBoxName));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });
  
    expect(initialBox).not.toHaveTextContent(initialBoxName);
    expect(initialBox).toHaveTextContent(musicData[1].name);
  });

  it('changes main-music-box image and name every 4 sec', async () => {
    const mainMusicBox = await screen.findByTestId('main-music-box');

    await waitFor(() =>
      expect(mainMusicBox.querySelector('img')).toHaveAttribute('src', musicData[0].image),
      expect(mainMusicBox).toHaveTextContent(musicData[0].name)
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });

    expect(mainMusicBox).not.toHaveTextContent(musicData[0].name);
    expect(mainMusicBox).toHaveTextContent(musicData[1].name);
    expect(mainMusicBox.querySelector('img')).not.toHaveAttribute('src', musicData[0].image);
    expect(mainMusicBox.querySelector('img')).toHaveAttribute('src', musicData[1].image);
  });

  it('closes and reopens the prompt', async () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    var displayedPrompt = screen.queryByTestId('custom-prompt');
    expect(displayedPrompt).not.toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });

    var displayedPrompt = screen.getByTestId('custom-prompt');
    expect(displayedPrompt).toBeInTheDocument();
  });

  it('changes prompt message for selected box', async () => {
    const prompt = await screen.findByTestId('custom-prompt');

    await waitFor(() => expect(prompt).toHaveTextContent(`Now playing: ${musicData[0].name}`));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });

    expect(prompt).not.toHaveTextContent(`Now playing: ${musicData[0].name}`);

    expect(prompt).toHaveTextContent(`Now playing: ${musicData[1].name}`);
  });

  it('displays prompt correctly for selected box', async () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    const prompt = screen.queryByTestId('custom-prompt');
    expect(prompt).not.toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });

    const displayedPrompt = screen.getByTestId('custom-prompt');
    expect(displayedPrompt).toBeInTheDocument();

    expect(displayedPrompt).toHaveTextContent(`Now playing: ${musicData[1].name}`);
  });

  it('logo changes from pause to play when the pause button is clicked & vice-versa', async () => {
    const pausePlayButton = screen.getByTestId('play-pause-logo');
    expect(pausePlayButton.src).toContain('pause.jpg');
    
    fireEvent.click(pausePlayButton);
    await waitFor(() => {
      expect(pausePlayButton.src).toContain('play.jpg');
    });

    fireEvent.click(pausePlayButton);
    await waitFor(() => {
      expect(pausePlayButton.src).toContain('pause.jpg');
    });
  });
  
  it('keeps the selected box unchanged when the pause button is clicked', async () => {
    const initialBox = await screen.findByTestId('main-music-box');
    const initialBoxName = musicData[0].name;
  
    fireEvent.click(screen.getByTestId('play-pause-logo'));
  
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4100));
    });
  
    expect(initialBox.querySelector('img')).toHaveAttribute('src', musicData[0].image);
    expect(initialBox).toHaveTextContent(initialBoxName);
    expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[0].name}`);
  });
  
  it('shifts to the next box after 4 seconds when pause and play buttons are clicked sequentially', async () => {
    const initialBox = await screen.findByTestId('main-music-box');
    const initialBoxName = musicData[0].name;
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    fireEvent.click(screen.getByTestId('play-pause-logo')); // Pause
    fireEvent.click(screen.getByTestId('play-pause-logo')); // Play

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3600));
    });

    expect(initialBox.querySelector('img')).toHaveAttribute('src', musicData[0].image);
    expect(initialBox).toHaveTextContent(initialBoxName);
    expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[0].name}`);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  
    const updatedBox = screen.getByTestId('main-music-box');
    expect(updatedBox.querySelector('img')).toHaveAttribute('src', musicData[1].image);
    expect(updatedBox).toHaveTextContent(musicData[1].name);
    expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[1].name}`);
  });

  it('selects the previous box when the backward button is clicked', async () => {
    var initialBox = screen.getByTestId('main-music-box');
    fireEvent.click(screen.getByTestId('backward-logo'));
    var updatedBox = screen.getByTestId('main-music-box');

    await waitFor(() => {
      expect(initialBox.querySelector('img')).not.toHaveAttribute('src', musicData[0].image);
      expect(initialBox).not.toHaveTextContent(musicData[0].name);
      expect(screen.getByTestId('custom-prompt')).not.toHaveTextContent(`Now playing: ${musicData[0].name}`);

      expect(updatedBox.querySelector('img')).toHaveAttribute('src', musicData[3].image);
      expect(updatedBox).toHaveTextContent(musicData[3].name);
      expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[3].name}`);
    });

    var initialBox = screen.getByTestId('main-music-box');
    fireEvent.click(screen.getByTestId('backward-logo'));
    var updatedBox = screen.getByTestId('main-music-box');
    await waitFor(() => {
      expect(initialBox.querySelector('img')).not.toHaveAttribute('src', musicData[3].image);
      expect(initialBox).not.toHaveTextContent(musicData[3].name);
      expect(screen.getByTestId('custom-prompt')).not.toHaveTextContent(`Now playing: ${musicData[3].name}`);

      expect(updatedBox.querySelector('img')).toHaveAttribute('src', musicData[2].image);
      expect(updatedBox).toHaveTextContent(musicData[2].name);
      expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[2].name}`);
    });
  
  });
  
  it('selects the next box when the forward button is clicked', async () => {
    var initialBox = screen.getByTestId('main-music-box');
    fireEvent.click(screen.getByTestId('forward-logo'));
    var updatedBox = screen.getByTestId('main-music-box');

    await waitFor(() => {
      expect(initialBox.querySelector('img')).not.toHaveAttribute('src', musicData[0].image);
      expect(initialBox).not.toHaveTextContent(musicData[0].name);
      expect(screen.getByTestId('custom-prompt')).not.toHaveTextContent(`Now playing: ${musicData[0].name}`);

      expect(updatedBox.querySelector('img')).toHaveAttribute('src', musicData[1].image);
      expect(updatedBox).toHaveTextContent(musicData[1].name);
      expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[1].name}`);
    });

    var initialBox = screen.getByTestId('main-music-box');
    fireEvent.click(screen.getByTestId('forward-logo'));
    var updatedBox = screen.getByTestId('main-music-box');
    await waitFor(() => {
      expect(initialBox.querySelector('img')).not.toHaveAttribute('src', musicData[1].image);
      expect(initialBox).not.toHaveTextContent(musicData[1].name);
      expect(screen.getByTestId('custom-prompt')).not.toHaveTextContent(`Now playing: ${musicData[1].name}`);

      expect(updatedBox.querySelector('img')).toHaveAttribute('src', musicData[2].image);
      expect(updatedBox).toHaveTextContent(musicData[2].name);
      expect(screen.getByTestId('custom-prompt')).toHaveTextContent(`Now playing: ${musicData[2].name}`);
    });
  });
});