const emojis =['😀', '😂', '🥰', '😎', '😢', '😡', '😱', '😴'];
let cards=[...emojis,...emojis];
let flippedCard=[];
let matchedCard=[];
let score=0;
let time=0;
let timer;

function startTimer(){

    timer=setInterval(()=>{
        time++;
        document.getElementById('timer').textContent=`Time:${time}`;
        
    },1000)
}
function shuffle(array){
    return array.sort(()=>Math.random()-0.5);
}

function createBoard(){

    let gameboard=document.getElementById('game-board');
    cards=shuffle(cards);

    cards.forEach((emoji)=> {
        const card=document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji= emoji;
        card.addEventListener('click',flipCard);
        gameboard.appendChild(card);
    }
);
startTimer();
}
function flipCard(){

    if(flippedCard.length>=2||this.classList.contains('flipped')){
        return;
    }
    this.textContent=this.dataset.emoji;
    this.classList.add('flipped');
    flippedCard.push(this);

    if(flippedCard.length==2){
        setTimeout(checkMatch,1000);
    }
}

function checkMatch(){
    const[card1,card2]=flippedCard;

    if(card1.dataset.emoji===card2.dataset.emoji){
        matchedCard.push(card1,card2);
        score=score+10;

        document.getElementById('score').textContent=`Score:${score}`;

        if(matchedCard.length===cards.length){
            clearInterval(timer);
            Swal.fire({
                title: "Game Over!",
                text: `Your score is ${score} at the time ${time}s`,
                icon: "success",
                confirmButtonText: "Play Again",
                allowOutsideClick: false
            }).then(() => {
                location.reload(); 
            });
        }
    }
    else{
        card1.textContent='';
        card2.textContent='';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCard=[];
}


createBoard();