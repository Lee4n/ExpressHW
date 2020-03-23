var friendsData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var totalDifference = 0;

        var match = {
            name: "",
            photo: "",
            matchDifference: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var scores = userScores.map(function (item) {
            return parseInt(item, 10);
        });

        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: scores
        };

        
        for (var i = 0; i < friendsData.length; i++) {
            totalDifference = 0;
            var sum = scores.reduce((a, b) => a + b, 0);
            var matchScore = friendsData[i].scores.reduce((a, b) => a + b, 0);
            totalDifference += Math.abs(sum - matchScore);

            if (totalDifference <= match.matchDifference) {
                match.name = friendsData[i].name;
                match.photo = friendsData[i].photo;
                match.matchDifference = totalDifference;
            }
        };

        friendsData.push(userData);

        res.json(match);
    });
};