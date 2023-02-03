"use strict";

const fs = require("fs");

let tweetsJSON = require('../data-files/initial-tweets.json');

module.exports = () => {
  
  const oneDayMs = 1000 * 60 * 60 * 24
  tweetsJSON = tweetsJSON.map((tweet, index) => {
    tweet.created_at = Date.now() - (oneDayMs * (tweetsJSON.length - index));
    return tweet;
  });

  fs.writeFileSync('server/data-files/initial-tweets.json', JSON.stringify(tweetsJSON, null, 2), { encoding: "utf8" });
};
