var friendsData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        friendsData.push(req.body);
        res.json(true);

        var userData = req.body;

        var scores = friendsData.map(function (item) {
            return parseInt(item, 10);
        });

        var match = {
            name: "",
            photo: "",
            difference: 1000
        };

        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: scores
        };

        for (var i = 0; i < friendsData.length; i++) {
            var totalDifference = 0;
            var sum = scores.reduce((a, b) => a + b, 0);
            var matchScore = friendsData[i].scores.reduce((a, b) => a + b, 0);
            totalDifference += Math.abs(sum - matchScore);

            if (totalDifference <= match.difference) {
                match.name = friendsData[i].name;
                match.photo = friendsData[i].photo;
                match.difference = totalDifference;
            }
        };

        friendsData.push(userData);

        res.json(match);
    });
};