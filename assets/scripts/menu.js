
// play sound
const soundSources = {
    sound1: "assets/sounds/short-car-ignition.wav",
    sound2: "assets/sounds/car-double-horn.wav"
};
function playSound(sound) {
    const audio = new Audio(soundSources[sound]);
    audio.play();
}

$('#card1').mouseenter(function () {
    $(this).find('.mode1').show(1000).fadeIn(1000);
    playSound("sound1");
});

$('#card1').mouseleave(function () {
    setTimeout
    $(this).find('.mode1').hide(1000).fadeOut(1000);
});

$('#card2').mouseenter(function () {
    $(this).find('.mode2').show(1000).fadeIn(1000);
    playSound("sound1");
});

$('#card2').mouseleave(function () {
    $(this).find('.mode2').hide(1000).fadeOut(1000);
});

document.getElementById("playMode1").addEventListener("click", function() {
    playSound("sound2");
    setTimeout(() => {
        window.location.href = "mode1.html";
    }, 1000);  
});
document.getElementById("playMode2").addEventListener("click", function() {
    playSound("sound2");
    setTimeout(() => {
        window.location.href = "mode2.html";
    }, 1000);
});