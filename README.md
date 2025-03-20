# React: Music Player (Hard)

## Environment 

- React Version: 18.2.0
- Node Version: 18(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/9LeGVeW4FSwpLoDAm7ojaQ/music-player-hard.gif)

## Functionality Requirements

The application should have the following features:

- **Data Extraction from 'data.json'**
    - The component should extract music data from the provided 'data.json' file.
    - Ensure that the extracted data is used to populate the musical boxes and retrieve information such as music names and image URLs.

- **Musical Box Rotation**
    - There are four musical boxes displayed in the user interface.
    - These musical boxes should automatically rotate every 4 seconds.
    - The currently selected musical box should be visually distinguished by adding a border around it.

- **Central Image and Name**
    - The central image and name in the UI should correspond to the selected musical box.
    - This means that as the musical boxes rotate, the central content (image and name) should update accordingly.

- **Prompt for Playing Music**
    - In the bottom right corner of the UI, there should be a prompt that displays the name of the music currently playing, indicated by the selected musical box.
    - The prompt should show a message like "Now playing: [Music Name]."
    - The prompt should initially appear when the page loads and display the name of the first selected music.

- **Forward and Backward Button**
    - Extract the forward and backward button icons from the provided 'logos' folder.
    - When the forward button is clicked, the currently selected musical box should move to the next box in the rotation sequence.
    - When the backward button is clicked, the currently selected musical box should move to the previous box in the rotation sequence.
    - The selected box should then run for the default 4 seconds before switching to the previous one.
    - The central content (image and name) should be updated accordingly.

- **Play/Pause Button**
    - Extract the play and pause button icons from the provided 'logos' folder.
    - Initially, the button should display a pause icon.
    - When the pause button is clicked, the selected box should remain in the same box until the play button is clicked again.
    - After clicking the pause button, it should change to a play icon and vice versa.
    - When the play button is clicked, the music in the currently selected box should reset and play for the default 4 seconds before switching.
    - The central content (image and name) should be updated accordingly. 

## Project Specifications

**Read Only Files**
- `src/App.test.js`
- `src/App.js`
- `src/data.json`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

