// Constants
const track = document.getElementById('track');
const cars = {
    red: document.getElementById('car-red'),
    black: document.getElementById('car-black'),
    blue: document.getElementById('car-blue'),
    yellow: document.getElementById('car-yellow'),
    gray: document.getElementById('car-gray'),
    green: document.getElementById('car-green'),
    white: document.getElementById('car-white'),
    purple: document.getElementById('car-purple'),
    orange: document.getElementById('car-orange'),
    other: document.getElementById('car-other'),
    emergency: document.getElementById('car-emergency')
};
const counters = {
    red: document.getElementById('red-count'),
    black: document.getElementById('black-count'),
    blue: document.getElementById('blue-count'),
    yellow: document.getElementById('yellow-count'),
    gray: document.getElementById('gray-count'),
    green: document.getElementById('green-count'),
    white: document.getElementById('white-count'),
    purple: document.getElementById('purple-count'),
    orange: document.getElementById('orange-count'),
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
    yellow: 0,
    gray: 0,
    green: 0,
    white: 0,
    purple: 0,
    orange: 0,
    other: 0,
};

let clickCounts = {
    red: 0,
    black: 0,
    blue: 0,
    yellow: 0,
    gray: 0,
    green: 0,
    white: 0,
    purple: 0,
    orange: 0,
    other: 0,
};

let emergencyCount = 0;
let totalClicks = 0;

// Function to move a car
function moveCar(color) { 
    const newPosition = positions[color] + 10; 
    positions[color] = newPosition; 
    cars[color].style.left = newPosition + 'px';
};

// Function to update click counts
function updateClickCounts() { };

// Function to play sound
function playSound(sound) { };

// Function to set up event listeners
function setupEventListeners() { };

const carButtons=document.querySelectorAll('.car-btn');
carButtons.forEach(function(button){
    button.addEventListener('click',function(){
        const color=this.getAttribute('data-color');
        moveCar(color);
    });
});

