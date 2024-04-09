// Counters
let totalPassed = 0;
let totalClicked = 0;
let totalNotClicked = 0;
let redCount = 0;
let blueCount = 0;
let blackCount = 0;
let whiteCount = 0;
let life = 5;
let carSpeed = 1;
let carCreationInterval = 1000;
let levelReached = 0;

// Function to create a car element and animate its movement
function createCar(color) {
    const car = document.createElement('div');
    car.classList.add('car', color);
    car.dataset.color = color; // Store color data attribute for the car 
    document.getElementById('road').appendChild(car);
    animateCar(car);
    // Increment total passed counter when a car is created. It will be used to calculate how many cars have left the track without being clicked.
    totalPassed++;
    document.getElementById('totalPassed').textContent = totalPassed;
}

// Function to update score counter, it will be called every time a car is clicked
function updateScore() {
    document.getElementById('scoreValue').textContent = totalClicked;
}

// Function to update level counter. It will be called every time the player reaches a new level and will be displayed in the game over modal
function updateLevel() {
    document.getElementById('levelValue').textContent = levelReached;
    document.getElementById('level-reached').textContent = levelReached;
}
// Function to animate car movement
function animateCar(car) {
    const trackWidth = document.getElementById('track').offsetWidth; // Get the width of the track
    const trackHeight = document.getElementById('track').offsetHeight; // Get the height of the track
    let xPos = -100; // Initial position of the car (starting from outside the left edge)
    let yPos = Math.floor(Math.random() * 4) * 100 + 25; // Randomly select a lane (0, 1, 2 or 3) and adjust to align with the middle of the lane

    const interval = setInterval(() => {
        if (xPos >= trackWidth) {
            clearInterval(interval); // Stop the animation when the car reaches the right edge of the track
            if (!car.clicked) { // Check if the car has not been clicked
                totalNotClicked++; // Increment total not clicked counter if the car has left the track without being clicked
                document.getElementById('totalNotClicked').textContent = totalNotClicked;
                life--;
                document.getElementById('lifeValue').textContent = '-'.repeat(life);

                if (life === 0) {
                    playSound('gameOver');
                    // Open the modal when the game is over to display the final score and level reached.
                    const modal = document.getElementById("end-game-modal");
                    modal.style.display = "block";

                    // When the user clicks on "Close Game" button, close the modal.
                    const closeGameButton = document.getElementById("closeGame");
                    closeGameButton.addEventListener("click", function () {
                        // Close the modal
                        modal.style.display = "none";
                        location.reload();
                    });

                    // When the user clicks on "Go to Index" button, go to index.html
                    const goToIndexButton = document.getElementById("goToIndex");
                    goToIndexButton.addEventListener("click", function () {
                        // Redirect to index.html
                        window.location.href = "index.html";
                    });
                }
            }

            car.remove(); // Remove the car element
        } else {
            xPos += carSpeed; // Move the car horizontally
            car.style.left = `${xPos}px`;
            car.style.top = `${yPos}px`;
        }
    }, 1000 / 60); // Update position approximately every 60 milliseconds

    // Add event listener to click on car
    car.addEventListener('click', () => {
        car.clicked = true; // Mark the car as clicked
        totalClicked++; // Increment total clicked counter
        updateScore(); // Update score counter

        // Update color-specific counters
        const color = car.dataset.color;
        eval(`${color}Count++`);
        document.getElementById(`${color}Count`).textContent = eval(`${color}Count`);

        car.remove(); // Remove the car element
    });
}

// Function to start the game
function startGame() {
    setInterval(() => {
        const colors = ['red', 'blue', 'black', 'white'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        createCar(randomColor);
    }, carCreationInterval); // Create a new car every 2 seconds
}

// Function to check if car speed and creation interval should be increased
function checkSpeedAndInterval() {
    if (totalClicked % 10 === 0 && totalClicked > 0) {
        playSound('nextLevel');
        levelReached++;
        updateLevel();
        carSpeed += 1;
        carCreationInterval -= 100;
        clearInterval(carCreationIntervalId);
        startGame();
    }
}

// Add event listener to start button
document.getElementById('start-button').addEventListener('click', startGame);

// Add event listeners to color buttons
document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.dataset.color; // Get the color of the clicked button
        const displayedCar = document.querySelector(`.car[data-color="${selectedColor}"]`); // Get the first displayed car with the clicked color
        if (displayedCar) {
            playSound('click')
            totalClicked++; // Increment total clicked counter
            document.getElementById('totalClicked').textContent = totalClicked;
            updateScore(); // Update score counter
            // Increment color-specific counters
            eval(`${selectedColor}Count++`);
            document.getElementById(`${selectedColor}Count`).textContent = eval(`${selectedColor}Count`);

            displayedCar.clicked = true; // Mark the car as clicked
            displayedCar.remove(); // Remove the displayed car

            checkSpeedAndInterval(); // Check if car speed and interval should be increased
        }
    });
});