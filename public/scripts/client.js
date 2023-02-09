// This function takes a string str as input and returns a HTML-encoded version of that string. 
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// This function takes a tweet object as input and returns an HTML string representation of the tweet.
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
              </div>
              </footer>
              </article>`;
// Return the created tweet element
  return $tweet;
};

// This is a sample tweet object that contains information about the user, tweet text, and the time it was created
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

// This function takes an array of tweets as input and displays them on the page by creating an HTML string for each tweet using the createTweetElement function
const renderTweets = function (tweets) {
  $("#tweets-container").empty();

  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);

    $("#tweets-container").prepend($tweet);
  });
};

// This function makes a GET request to the /tweets endpoint to retrieve the tweets and calls the renderTweets function to display them.
const loadTweets = function () {
  $.ajax("/tweets", {
    method: "GET",
    success: (tweets, status) => {
      console.log("Successfully loaded tweets:", tweets);
      renderTweets(tweets);
    },
  });
};

// This code sets up the event listener for the form submission and makes a POST request to the /tweets endpoint with the tweet text as data
$(document).ready(() => {
  $("form").submit(function (event) {
    event.preventDefault();
    const data = $("#tweet-text").serializeArray();
    const tweetText = data[0].value;
    console.log("data", data);
    // If the tweet text is empty or more than 140 characters, it shows an error. If the request is successful, it calls the loadTweets function to refresh the tweets. If the request fails, it shows a server error message.
    if (tweetText.length === 0) {
      $(".error-empty").removeAttr("display");
      $(".error-empty").slideDown("slow");
      return;
    } else if (tweetText.length >= 140) {
      $(".error-length").removeAttr("display");
      $(".error-length").slideDown("slow");
      return;
    }
    $(".server-error").css("display", "none");
    $(".error-empty").css("display", "none");
    $(".error-length").css("display", "none");

    $.ajax("/tweets", {
      method: "POST",
      data,
      success: (res, status) => {
        loadTweets();

        $("#tweet-text").val("");
      },
      error: (jqXHR) => {
        $(".server-error").removeAttr("display");
        $(".server-error").slideDown("slow");
        $("#server-error-text").text(jqXHR.responseJSON.error);
      },
    });
  });
  // This line calls the loadTweets function to load the tweets when the page is ready.
  loadTweets();
});
