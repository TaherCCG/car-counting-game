/**
 * @jest-environment jsdom
 */

// Import the functions to be tested
const { playSound, setupEventListeners } = require('../menu.js');

// Mock Sound Tests
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

describe('setupEventListeners function', () => {
    beforeEach(() => {
        // Create mock DOM elements
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
        // Reset event listeners
        jest.clearAllMocks();
        setupEventListeners();
    });

    test('it should display mode1 when mouse enters card1', () => {
        const card1 = document.getElementById('card1');
        card1.dispatchEvent(new Event('mouseenter'));
        expect(card1.querySelector('.mode1').style.display).toBe('block');
    });

    test('it should hide mode1 when mouse leaves card1', () => {
        const card1 = document.getElementById('card1');
        card1.dispatchEvent(new Event('mouseenter'));
        card1.dispatchEvent(new Event('mouseleave'));
        expect(card1.querySelector('.mode1').style.display).toBe('none');
    });

    test('it should display mode2 when mouse enters card2', () => {
        const card2 = document.getElementById('card2');
        card2.dispatchEvent(new Event('mouseenter'));
        expect(card2.querySelector('.mode2').style.display).toBe('block');
    });

    test('it should hide mode2 when mouse leaves card2', () => {
        const card2 = document.getElementById('card2');
        card2.dispatchEvent(new Event('mouseenter'));
        card2.dispatchEvent(new Event('mouseleave'));
        expect(card2.querySelector('.mode2').style.display).toBe('none');
    });
});



