document.addEventListener('DOMContentLoaded', function () {

    // Function to set up event listeners
    function setupEventListeners() {
        const card1 = document.getElementById('card1');
        const card2 = document.getElementById('card2');
        const playMode1 = document.getElementById('playMode1');
        const playMode2 = document.getElementById('playMode2');

        if (card1 && card2 && playMode1 && playMode2) {
            // Hover effect for card1 and card2
            card1.addEventListener('mouseenter', function () {
                this.querySelector('.mode1').style.display = 'block';
                playSound("sound1");
            });

            card1.addEventListener('mouseleave', function () {
                this.querySelector('.mode1').style.display = 'none';
            });

            card2.addEventListener('mouseenter', function () {
                this.querySelector('.mode2').style.display = 'block';
                playSound("sound1");
            });

            card2.addEventListener('mouseleave', function () {
                this.querySelector('.mode2').style.display = 'none';
            });

            // Event listener for playMode1 and playMode2 buttons
            playMode1.addEventListener('click', function () {
                playSound("sound2");
                setTimeout(() => {
                    window.location.href = "mode1.html";
                }, 1000);
            });

            playMode2.addEventListener('click', function () {
                playSound("sound2");
                setTimeout(() => {
                    window.location.href = "mode2.html";
                }, 1000);
            });
        }
    }
    // Call setupEventListeners when DOM is ready
    setupEventListeners();
});

// Export the functions
module.exports = { playSound, setupEventListeners };

/*  
---------------------------------------------------------------------------------
Version 1  
    Changed to above code as I was having problems testing this code with jest.  
    I could not test jquery code with jest.  I had to change the code to vanilla 
    javascript to test it with jest. I have left the original code here for reference.
---------------------------------------------------------------------------------  
//Function to set up event listeners
function setupEventListeners() {
    $('#card1').mouseenter(function () {
        $(this).find('.mode1').show(1000).fadeIn(1000);
        playSound("sound1");
    });

    $('#card1').mouseleave(function () {
        $(this).find('.mode1').hide(1000).fadeOut(1000);
    });

    $('#card2').mouseenter(function () {
        $(this).find('.mode2').show(1000).fadeIn(1000);
        playSound("sound1");
    });

    $('#card2').mouseleave(function () {
        $(this).find('.mode2').hide(1000).fadeOut(1000);
    });

    document.getElementById("playMode1").addEventListener("click", function () {
        playSound("sound2");
        setTimeout(() => {
            window.location.href = "mode1.html";
        }, 1000);
    });
    document.getElementById("playMode2").addEventListener("click", function () {
        playSound("sound2");
        setTimeout(() => {
            window.location.href = "mode2.html";
        }, 1000);
    });
}

// Call setupEventListeners when DOM is ready
$(document).ready(function () {
    setupEventListeners();
});
 ---------------------------------END------------------------------------------------*/
