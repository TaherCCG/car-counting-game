/**
 * @jest-environment jsdom
 */

// Import the functions to be tested
const { setupEventListeners } = require('../main.js');
const { playSound } = require('../sound-feature.js');
/* Mock the Audio constructor and play method to test the playSound function
 Got the solution from https://jestjs.io/docs/es6-class-mocks and https://stackoverflow.com/questions/69591847/how-do-i-mock-audio-api-in-jest-properly
 Also used this method in the previous walk through project simon game to mock the audio.
*/
describe('playSound function', () => {
  test('it should play the specified sound "car ignition"', () => {
    // Mock the Audio constructor and play method
    const audioMock = jest.fn();
    global.Audio = jest.fn(() => ({
      play: audioMock
    }));

    // Call the function that plays the sound
    playSound('sound1');

    // Check if the Audio constructor is called with the correct sound source
    expect(global.Audio).toHaveBeenCalledWith('assets/sounds/short-car-ignition.wav');
    // Check if the play method is called
    expect(audioMock).toHaveBeenCalled();
  });
  test('it should play the specified sound "car horn"', () => {
    // Mock the Audio constructor and play method
    const audioMock = jest.fn();
    global.Audio = jest.fn(() => ({
      play: audioMock
    }));

    // Call the function that plays the sound
    playSound('sound2');

    // Check if the Audio constructor is called with the correct sound source
    expect(global.Audio).toHaveBeenCalledWith('assets/sounds/car-double-horn.wav');
    // Check if the play method is called
    expect(audioMock).toHaveBeenCalled();
  });

});



// Mocking the DOM elements and functions
document.body.innerHTML = `
    <div id="card1">
        <div class="mode1"></div>
    </div>
    <div id="card2">
        <div class="mode2"></div>
    </div>
    <button id="playMode1"></button>
    <button id="playMode2"></button>
`;

global.playSound = jest.fn();

describe('setupEventListeners', () => {
  test('adds mouseenter listener to card1', () => {
    setupEventListeners();
    const card1 = document.getElementById('card1');
    card1.dispatchEvent(new Event('mouseenter'));
    expect(card1.querySelector('.mode1').style.display).toBe('block');
    expect(global.playSound).toHaveBeenCalledWith('sound1');
  });

  test('adds mouseleave listener to card1', () => {
    setupEventListeners();
    const card1 = document.getElementById('card1');
    card1.dispatchEvent(new Event('mouseleave'));
    expect(card1.querySelector('.mode1').style.display).toBe('none');
  });

  test('adds mouseenter listener to card2', () => {
    setupEventListeners();
    const card2 = document.getElementById('card2');
    card2.dispatchEvent(new Event('mouseenter'));
    expect(card2.querySelector('.mode2').style.display).toBe('block');
    expect(global.playSound).toHaveBeenCalledWith('sound1');
  });

  test('adds mouseleave listener to card2', () => {
    setupEventListeners();
    const card2 = document.getElementById('card2');
    card2.dispatchEvent(new Event('mouseleave'));
    expect(card2.querySelector('.mode2').style.display).toBe('none');
  });

});
