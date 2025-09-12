angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .config(function($sceDelegateProvider) {$sceDelegateProvider.resourceUrlWhitelist(['**']);});

var speedMod = 0.2;
var speedModFactor = 1.1;
  
function mainCtrl($scope, $http) {
    $scope.maxLevel = 20;
    
    $scope.level = 1;
    $scope.kitties = 2;
    $scope.score = 0;
    $scope.levelScore = 0;
    $scope.player = "...";
    $scope.nextLevelText = "Next Level";

    $scope.leaderBoard;
    $scope.highScore = {score: 100, player: "R2-D2"};
    $scope.highLevel = {level: 1, player: "Phineas"};
    
    $http.get("/high_score?score=" + $scope.score + "&player=" + encodeURI($scope.player)).then(function(response) {
        $scope.highScore = response["data"];
    });
    
    $http.get("/high_level?level=" + $scope.level + "&player=" + encodeURI($scope.player)).then(function(response) {
        $scope.highLevel = response["data"];
    });
    
    $scope.spotted = function() {
        $(".puppy").hide();
        $(".kitty").hide();
        
        $("#game").hide();
        $("#level-stats").fadeIn(40);
        
        $scope.elapsed = new Date() - $scope.start;
        $scope.time = $scope.elapsed/1000;
        $scope.levelScore = calcScore($scope.time, $scope.level);
        $scope.score += $scope.levelScore;
        
        $http.get("/scores?level=" + $scope.level + "&score=" + $scope.levelScore + "&player=" + encodeURI($scope.player)).then(function(response) {
            $scope.leaderBoard = response["data"][$scope.level];
        });

    };
    
    $scope.nextLevel = function() {
        if ($scope.level < $scope.maxLevel) {
            $scope.level++;
            $scope.kitties++;
            speedMod *= speedModFactor;

            $("#game").show();
            $("#level-stats").hide();

            $(".puppy").show();
            $(".kitty").show();
            
            animateDiv($("#kitty-" + ($scope.kitties-1)));

            $scope.start = new Date();
        }
        else {
            $scope.endGame();
        }
        
        if($scope.level == $scope.maxLevel) {
            $scope.nextLevelText = "On to Victory";
        }
        
        $http.get("/high_score?score=" + $scope.score + "&player=" + encodeURI($scope.player)).then(function(response) {
            $scope.highScore = response["data"];
        });
        
        $http.get("/high_level?level=" + $scope.level + "&player=" + encodeURI($scope.player)).then(function(response) {
            $scope.highLevel = response["data"];
        });
    };
    
    $scope.beginGame = function(name) {
        if(!name) {
            $scope.player = $scope.randomName();
        }
        else {
            $scope.player = name;
        }
        
        $("#name").hide();
        $("#game").show();
        
        $(".puppy").show();
        $(".kitty").show();
        animateDiv($(".puppy"));
        
        for(var i = 1; i <= $scope.kitties; i++) {
            animateDiv($("#kitty-"+i));
        }
        
        $scope.start = new Date();
        
    };
    
    $scope.endGame = function() {
        $("#level-stats").hide();
        $("#victory").show();
        
        $http.get("/scores?level=champs").then(function(response) {
            $scope.leaderBoard = response["data"];
        });
    };
    
    $scope.range = function(x, y) {
        $scope.nums = [];
        
        while(x <= y) {
            $scope.nums.push(x);
            x++;
        }
        
        return $scope.nums;
    };
    
    $scope.randomName = function() {
        $scope.index = Math.floor((Math.random() * $scope.guestNames.length));
        return $scope.guestNames[$scope.index];
    };
    
    $scope.guestNames = [
        "Scooby",
        "Snoopy",
        "Snoop Dog",
        "Pluto",
        "Old Yeller",
        "Fido",
        "Clifford"
    ];
}


function makeNewPosition($container) {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $container.height() + 400;
    var w = $container.width() + 200;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $target.animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        animateDiv($target);
    });
}

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speed = Math.ceil(greatest / speedMod);

    return speed;
}

function calcScore(time, level) {
    var score = 100 + (1000/time)*((10+level)/10);
    score = Math.floor(score);
    return score;
}