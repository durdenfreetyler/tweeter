$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const errorEmpty = $(".error-empty");
    const errorLength = $(".error-length");
    if (errorEmpty.is(":visible")) {
        errorEmpty.slideUp();
    }
    
    if (errorLength.is(":visible")) {
        errorLength.slideUp();
    }

    let maxLength = 140;
    let length = $(this).val().length;
    
    $(".counter").text(maxLength - length);

    if (length > maxLength) {
      $(".counter").css("color", "red");
    }

    else {
      $(".counter").css("color", "black");
    }
  });
});
