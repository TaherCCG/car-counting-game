$('#card1').mouseenter(function () {
    $(this).find('.mode1').fadeIn(1000);
});

$('#card1').mouseleave(function () {
    $(this).find('.mode1').fadeOut(2000);
});

$('#card2').mouseenter(function () {
    $(this).find('.mode2').fadeIn(1000);
});

$('#card2').mouseleave(function () {
    $(this).find('.mode2').fadeOut(2000);
});


document.getElementById("playMode1").addEventListener("click", function() {
    window.location.href = "mode1.html";
});
document.getElementById("playMode2").addEventListener("click", function() {
    window.location.href = "mode2.html";
});
