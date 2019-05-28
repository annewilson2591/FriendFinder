var friendsList = require("../data/friends.js");

module.exports = function (app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function(req, res) {
        
        var newFriendScore = req.body.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;

        console.log(req.body);

        for(var i=0; i<friendsList.length; i++) {
            var scoresDifference = 0;

            for (var j=0; j<newFriendScore.length; j++) {
                scoresDifference += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScore[j])));
            }

            scoresArray.push(scoresDifference);
        }

        for (var i=0; i<scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        var newFriend = friendsList[bestMatch];
        res.json(newFriend);

        friendsList.push(req.body);

    });
};

        