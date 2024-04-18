let currentStep = 0;
const steps = document.querySelectorAll('.step');
const blurOverlay = document.querySelector('.blur-overlay');
const tutorialContainer = document.querySelector('.tutorial-container');

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

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

function closeTutorial() {
  // Hide all steps and reset to the first step
  steps.forEach(step => step.classList.remove('active'));
  currentStep = 0;
  hideTutorial();
}

function toggleTutorial() {
  if (tutorialContainer.style.display === 'none') {
    showTutorial();
  } else {
    hideTutorial();
  }
}

function showTutorial() {
  blurOverlay.style.display = 'block';
  tutorialContainer.style.display = 'block';
  showStep(0); // Show the first step initially
}

function hideTutorial() {
  blurOverlay.style.display = 'none';
  tutorialContainer.style.display = 'none';
}