/*  A simple programme for determining likely outcomes in tournaments in the style of 
    Hearthstone or MTG Arena, where players can play any number of matches until they reach 
    a set number of wins or losses. */

let players = [];
let finishedPlayers = [];
let maxWins = 7;
let maxLosses = 3;
let playerNum = (128*128*128)


//This function will give the distribution of outcomes for an entire cohort of players. 
//runWholeTourney();

//This function gives the % likelihood of each number of wins, for a player with a given 
// % winrate. 
runIndividualPlayers(playerNum, 0.66);

function runWholeTourney(){ 
    console.log("/////////////TRACKING A WHOLE TOURNEY/////////////");
    console.log(playerNum +" players")
    populatePlayers(playerNum);
    round(players);
    countWins(players);
    console.log("//////////////////////////////////////////////////");
}
function makeAPlayer(id) {
    let player = {
        id: id,
        wins: 0,
        losses: 0
    }
    return player;
}

function populatePlayers(num) {
    for (let i = 0; i < num; i++) {
        players.push(makeAPlayer(i))
    }
}

function fight(one, two, winners, losers){
    if (Math.random() < .5){
        one.wins++;
        if (one.wins < maxWins) {
            winners.push(one);
        } else {
            finishedPlayers.push(one);
        }
        
        two.losses++;
        if (two.losses < maxLosses) {
            losers.push(two);
        } else {
            finishedPlayers.push(two);
        }
    } else{
        two.wins++;
        if (two.wins < maxWins) {
            winners.push(two);
        } else {
            finishedPlayers.push(two);
        }
        one.losses++;
        if (one.losses < maxLosses) {
            losers.push(one);
        } else {
            finishedPlayers.push(one);
        }
    }
}

function round(players) {
    let winnersBracket = [];
    let losersBracket = [];
    let half = players.length/2;

    for (let i = 0; i < half; i++) {
        fight(players[i],players[i+half], winnersBracket, losersBracket)
    }
    if (winnersBracket.length > 1){
        round(winnersBracket);
    }
    if (losersBracket.length > 1){
        round(losersBracket);
    }

}

function countWins(players){
    //console.log(players);
    let total = 0
    let wincount = []
    wincount.length = (maxWins+1);
    wincount = wincount.fill(0,0, (maxWins+1));
    
    for(player of players){
        (wincount[player.wins])++;
    }

    for (let i = 0; i <= maxWins; i++){
        console.log(wincount[i] +" players got "+i+"wins ("+(wincount[i]/playerNum)*100+"% of total)");
        //console.log('='+wincount[i]+'/'+playerNum);        
        total += wincount[i];
    }
    console.log(total +" players in exhausted array.");
}

function runIndividualPlayers(num, winrate){
    let n = num;
    let completedPlayers = []
    completedPlayers.length = maxWins+1;
    completedPlayers = completedPlayers.fill(0,0, (maxWins+1));
    for (let i = 0; i < n; i++) {
        let player = makeAPlayer(i);
        while(player.wins < maxWins && player.losses < maxLosses) {
            if (Math.random() < winrate){
                player.wins++;
            } else {
                player.losses++;
            }
        }
        (completedPlayers[player.wins])++;  
    }
    
    completedPlayers.map((x, i) => {
        console.log(i +" wins: "+x+", = "+((x/n)*100).toFixed(2)+"%")
        //console.log(x/n);
    })
}