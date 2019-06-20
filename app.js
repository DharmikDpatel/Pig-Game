/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundscore, activePlayer, gamePlaying, prevDice, prevDice1, maxLimit;

init();



//document.getElementById('sub').addEventListener('click', function(){
//    maxLimit = document.getElementById('max').value;
//    document.getElementById('max').value = "";
//    document.getElementById('max-label').value = maxLimit;
//    //console.log(maxLimit);
//});

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if(gamePlaying){
        //maxLimit = document.getElementById('max').value;
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        var dice1DOM = document.querySelector('.dice1');
        diceDOM.style.display = 'block';
        dice1DOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        var currentDOM = document.getElementById('current-' + activePlayer);

        if((prevDice === 6 && dice === 6) || (prevDice1 === 6 && dice1 === 6)){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            currentDOM.textContent = '0';
            nextPlayer();
        }
        else if(dice !== 1 && dice1 !== 1){
                roundscore += (dice + dice1); 
                currentDOM.textContent = roundscore;
        }
        else{
            nextPlayer();
        }
        prevDice = dice;
        prevDice1 = dice1;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        maxLimit = document.getElementById('max').value;
        if(!maxLimit){
            maxLimit = 10;
        }
        scores[activePlayer] += roundscore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= maxLimit){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();    
        }
    }
});

function nextPlayer(){
    //document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
    var currentDOM = document.getElementById('current-' + activePlayer);
    currentDOM.textContent = '0';
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;
    //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    roundscore = 0;
    prevDice = 0;
    prevDice1 = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundscore = 0;
    activePlayer = 0;
    gamePlaying  = true;
    prevDice = 0;
    prevDice1 = 0;
    //maxLimit = 10;
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //document.getElementById('max-label').value = maxLimit;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




