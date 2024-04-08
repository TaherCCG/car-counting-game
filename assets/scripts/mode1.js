
// Constants
const track = document.getElementById('track');
const cars = {
    red: document.getElementById('car-red'),
    black: document.getElementById('car-black'),
    blue: document.getElementById('car-blue'),
    gray: document.getElementById('car-gray'),
    white: document.getElementById('car-white'),
    other: document.getElementById('car-other'),
    emergency: document.getElementById('car-emergency')
};
const counters = {
    red: document.getElementById('red-count'),
    black: document.getElementById('black-count'),
    blue: document.getElementById('blue-count'),
    gray: document.getElementById('gray-count'),
    white: document.getElementById('white-count'),
    other: document.getElementById('other-count'),
    emergency: document.getElementById('emergency-count'),
    total: document.getElementById('total-count')
};
// Console log the cars and counters objects to see their structure
console.log('cars:', cars);
console.log('counters:', counters);

const winningPosition = 100;

let positions = {
    red: 0,
    black: 0,
    blue: 0,
    gray: 0,
    white: 0,
    other: 0,
};

let clickCounts = {
    red: 0,
    black: 0,
    blue: 0,
    gray: 0,
    white: 0,
    other: 0,
};

let emergencyCount = 0;
let totalClicks = 0;

// Function to move a car
function moveCar(color) {
    playSound('sound2');
    if (cars[color]) {
        const newPosition = positions[color] + 10;
        positions[color] = newPosition;
        cars[color].style.left = newPosition + 'px';
    } else {
        console.error('Invalid color:', color);
    }
}


// Function to update click counts
function updateClickCounts(color) {
    clickCounts[color]++;
    totalClicks++;
    counters[color].innerText = clickCounts[color];
    counters.total.innerText = totalClicks;
    counters.emergency.innerText = emergencyCount;
    console.log(clickCounts);
    console.log(totalClicks);
};

// Function to play sound
// function playSound(soundFile) { 
//     const sound = new Audio(soundFile);
//     sound.play();
// };

// Function to set up event listeners
function setupEventListeners() { };

const carButtons = document.querySelectorAll('.car-btn');
carButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const color = this.getAttribute('data-color');
        moveCar(color);
        updateClickCounts(color);
    });
});



module.exports = { moveCar };