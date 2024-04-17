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
    // Console log the cars and counters to see what they are and what they contain for debugging
    console.log('cars:', cars);
    console.log('counters:', counters);

    let hasStarted = {
        red: false,
        black: false,
        blue: false,
        gray: false,
        white: false,
        other: false,
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

    let totalClicks = 0;
    // Debugging console log function
    function debug() {
    console.log('clickCounts:', clickCounts);
    console.log('totalClicks:', totalClicks);
    console.log('positions:', positions);
    console.log('previousPositions:', previousPositions);
    console.log('hasStarted:', hasStarted);
    }

    // Function to move a car
    function moveCar(color) {
        const newPosition = positions[color] + 10; // Move by 10 pixels

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
    }

    // Function to update click counts
    function updateClickCounts(color) {
        clickCounts[color]++;
        totalClicks++;
        counters[color].innerText = clickCounts[color];
        counters.total.innerText = totalClicks;
        debug();
    }



    // Event listener for button clicks

    const carButtons = document.querySelectorAll(".car-btn");
    carButtons.forEach(button => {
        button.addEventListener("click", function () {
            const color = this.getAttribute("data-color");
            if (totalClicks <= 100) {
                moveCar(color); // Call moveCar
                updateClickCounts(color); // Call updateClickCounts
                previousPositions[color] = positions[color]; // Update previous position
                if (totalClicks >= 100) {
                    declareGameOver();
                }
            }
        });
    });

    function declareGameOver() {
        // Display the modal
        const modal = document.getElementById("end-game-modal-1");
        modal.style.display = "block";

        // Display the final counts in the end game modal
        document.getElementById("final-red").textContent = clickCounts.red;
        document.getElementById("final-black").textContent = clickCounts.black;
        document.getElementById("final-blue").textContent = clickCounts.blue;
        document.getElementById("final-gray").textContent = clickCounts.gray;
        document.getElementById("final-white").textContent = clickCounts.white;
        document.getElementById("final-other").textContent = clickCounts.other;
        document.getElementById("final-total").textContent = totalClicks;

        // When the user clicks on "Close Game" button, close the modal.
        const closeGameButton = document.getElementById("closeGame");
        closeGameButton.addEventListener("click", function () {
            // Close the modal
            modal.style.display = "none";
            location.reload();
        });
        // When the user clicks on "Home" button, go to index.html
        const goToIndexButton = document.getElementById("goToIndex");
        goToIndexButton.addEventListener("click", function () {
            // Redirect to index.html
            window.location.href = "index.html";
        });
    };
});

module.exports = { moveCar };