/* jshint esversion: 11 */

/* Define current step of the tutorial */
let currentStep = 0;
/* Get the tutorial elements from the DOM */
const steps = document.querySelectorAll('.step');
const blurOverlay = document.querySelector('.blur-overlay');
const tutorialContainer = document.querySelector('.tutorial-container');
/* Event listeners for tutorial 
 Function to add or remove which step is active  */
function showStep(stepIndex) {
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    currentStep = stepIndex;
}
/* Function to move to the next step */
function nextStep() {
    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    }
}
/* Function to move to the previous step */
function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}
/* Function to close the tutorial and reset to the first step */
function closeTutorial() {
    // Hide all steps and reset to the first step
    steps.forEach(step => step.classList.remove('active'));
    currentStep = 0;
    hideTutorial();
}
/* Function to toggle the tutorial visibility when the tutorial button is clicked */
function toggleTutorial() {
    if (tutorialContainer.style.display === 'none') {
        showTutorial();
    } else {
        hideTutorial();
    }
}
/* Function to show the tutorial */
function showTutorial() {
    blurOverlay.style.display = 'block';
    tutorialContainer.style.display = 'block';
    showStep(0); // Show the first step initially
}
/* Function to hide the tutorial */
function hideTutorial() {
    blurOverlay.style.display = 'none';
    tutorialContainer.style.display = 'none';
}