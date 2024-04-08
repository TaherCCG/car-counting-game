document.addEventListener("DOMContentLoaded", function () {
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

    const winningPosition = 600;
    let isWinnerDeclared = false;

    let hasStarted = {
        red: false,
        black: false,
        blue: false,
        gray: false,
        white: false,
        other: false,
        police: false // Add police flag
    };

    let positions = {
        red: 0,
        black: 0,
        blue: 0,
        gray: 0,
        white: 0,
        other: 0,
    };

    let previousPositions = {
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
        const newPosition = positions[color] + 10; // Move by 2 pixels

        // Check if the car has overtaken another car
        Object.keys(cars).forEach(key => {
            if (key !== color && newPosition > previousPositions[key] && previousPositions[color] <= previousPositions[key]) {
                if (previousPositions[key] !== 0) {
                    playSound('sound2'); // Play sound if the car overtakes another car
                }
            }
        });

        // Check if the car starts moving for the first time
        if (!hasStarted[color] && clickCounts[color] === 0) {
            playSound('sound1'); // Play start sound if it's the first click for this car
            hasStarted[color] = true; // Set flag to indicate the car has started moving
        }

        positions[color] = newPosition;
        cars[color].style.left = `${newPosition}px`;

        if (newPosition >= winningPosition && !isWinnerDeclared) {
            declareWinner(color);
        }
    }


    // Function to declare the winner
    function declareWinner(color) {
        isWinnerDeclared = true;
        alert(`${color.toUpperCase()} Car Wins!`);
    }

    // Function to update click counts
    function updateClickCounts(color) {
        clickCounts[color]++;
        totalClicks++;
        counters[color].innerText = clickCounts[color];
        counters.total.innerText = totalClicks;
    }



    // Event listener for button clicks
    const carButtons = document.querySelectorAll(".car-btn");
    carButtons.forEach(button => {
        button.addEventListener("click", function () {
            const color = this.getAttribute("data-color");
            if (!isWinnerDeclared) {
                moveCar(color); // Call moveCar
                updateClickCounts(color); // Call updateClickCounts
                previousPositions[color] = positions[color]; // Update previous position
            }
        });
    });
});


module.exports = { moveCar };