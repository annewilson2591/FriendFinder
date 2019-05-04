var friends = require("../data/friends");

module.exports = function (app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        var user = req.body;
        var userScores = user.scores;
            
            friends.forEach((friend) => {
                console.log(friend, "friend");
                
                var totalDifference = 0;
    
                    friend.scores.forEach((friendScore, index) => {

                        totalDifference += Math.abs(parseInt(userScores[index]) - parseInt(friendScore[index]));
    
                        if (totalDifference <= bestMatch.friendDifference) {
    
                            bestMatch.name = friend.name;
                            bestMatch.photo = friend.photo;
                            bestMatch.friendDifference = totalDifference;
                    }
                    });
                    
            });

        console.log('userScores', userScores);

        

        
        //push new user into friend array
        friends.push(user);

        res.json(bestMatch);
    });
}