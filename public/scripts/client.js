const escape = function (str) {
  let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

const createTweetElement = function (tweetObject) {

  const $tweet = `<article class="tweet-container">
          <header class="tweet-header">
            <div class="left-header">
              <img
                class="user-icon"
                src=${tweetObject.user.avatars}
                alt=${tweetObject.user.name}
              />
              <p>${tweetObject.user.name}</p>
            </div>
            <p class="user-handle">${tweetObject.user.handle}</p>
          </header>
          <div class="tweet">
          <p class="tweet-input">
          ${escape(tweetObject.content.text)}
          </p>
          </div>
          <footer class="tweet-footer">
            <div class="days-ago">${timeago.format(
              tweetObject.created_at
            )}</div>
            <div class="icon-group">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
              <!-- <i class="fa-thin fa-flag-swallowtail"></i>
              <i class="fa-light fa-recycle"></i>
              <i class="fa-regular fa-heart"></i> -->
              </div>
              </footer>
              </article>`;
    return $tweet;
};

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const renderTweets = function (tweets) {
  $("#tweets-container").empty();

  tweets.forEach((tweet) => {

    const $tweet = createTweetElement(tweet);

    $("#tweets-container").prepend($tweet);
  });
};

const loadTweets = function () {
  $.ajax("/tweets", {
      method: "GET",
      success: (tweets, status) => {
      console.log("Successfully loaded tweets:", tweets);
      renderTweets(tweets);
    },
  });
};

$(document).ready(() => {
  $("form").submit(function (event) {
    event.preventDefault();
    const data = $("#tweet-text").serializeArray();
    const tweetText = data[0].value;
    console.log("data", data);

    if (tweetText.length === 0) {
      $(".error-empty").removeAttr("display");
      $(".error-empty").slideDown("slow");
    }
    
    else if (tweetText.length >= 140) {
      $(".error-length").removeAttr("display");
      $(".error-length").slideDown("slow");
    }

    $.ajax("/tweets", {
          method: "POST",
          data,
          success: (res, status) => {
          $.ajax("/tweets", {
          method: "GET",
          success: (tweets, status) => {
          renderTweets(tweets);
            },
          
        });

        $("#tweet-text").val("");
      },
    });
  });
  loadTweets();
});
