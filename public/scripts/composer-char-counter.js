$(document).ready(function () {
  $("#tweet-text").on("keypress", function () {
    let maxLength = 140;
    let length = $(this).val().length;
    let remaining = maxLength - length;
    if (remaining >= 0) {
      $(".counter").text(remaining).css("color", "black");
    } else {
      $(".counter")
        .text(Math.abs(remaining) * -1)
        .css("color", "red");
    }
  });
});
