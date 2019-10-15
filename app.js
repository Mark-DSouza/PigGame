/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, scoreRound, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        //Generate a random number between 1 to 6
        var dice = Math.floor(Math.random() * 6) + 1;
        
        //Update UI(dice image)
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //Add number to scoreRound if NOT 1
        if (dice !== 1){
            //Add to scoreRound
        
            scoreRound += dice;
            document.querySelector('#current-' + activePlayer).textContent = scoreRound;

        }

        else{
            //Switch Player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Update Global score using current round score
        scores[activePlayer] += scoreRound;
        
        //Reset round scores
        scoreRound = 0;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20){    //Check for Winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        }
        
        else{   //Switch Players
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    gamePlaying = true;
    scores = [0, 0];
    scoreRound = 0;
    activePlayer = 0;
    
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';    
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    scoreRound = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}