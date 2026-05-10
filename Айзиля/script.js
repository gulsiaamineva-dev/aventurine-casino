const START_BALANCE = 150;
const SPIN_COST = 50;

let balance = START_BALANCE;
let spinAttempt = 0;
let isSpinning = false;

const balanceEl = document.getElementById('balance');
const spinBtn = document.getElementById('spinButton');
const resultDiv = document.getElementById('resultMessage');
const attemptSpan = document.getElementById('attemptCounter');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

const symbols = ["💎", "🎲", "⭐", "♣️", "♦️", "🍾"];

function randSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateUI() {
    balanceEl.innerText = balance;
    if (spinAttempt === 0) attemptSpan.innerText = "🍀 Attempt #1 · Guaranteed win on 3rd spin 🍀";
    else if (spinAttempt === 1) attemptSpan.innerText = "🎲 Attempt #2 · One more spin to jackpot! 🎲";
    else if (spinAttempt === 2) attemptSpan.innerText = "💎 Final attempt #3 · 100% WINNER! 💎";
    
    if (balance < SPIN_COST || spinAttempt >= 3) {
        spinBtn.disabled = true;
        if (spinAttempt >= 3) spinBtn.innerText = "🏆 CLAIM YOUR PRIZE NOW 🏆";
    } else {
        spinBtn.disabled = false;
    }
}

function getFinalResult() {
    const isGuaranteedWin = (spinAttempt === 2);
    
    if (isGuaranteedWin) {
        return { s1: "💎", s2: "💎", s3: "💎", isWin: true };
    } else {
        let s1 = randSymbol();
        let s2 = randSymbol();
        let s3 = randSymbol();
        const isJackpot = (s1 === "💎" && s2 === "💎" && s3 === "💎");
        return { s1, s2, s3, isWin: isJackpot };
    }
}

function spin() {
    if (isSpinning) return;
    if (balance < SPIN_COST) {
        resultDiv.innerHTML = "⚠️ No chips left... Go get your prize! ⚠️";
        return;
    }
    
    isSpinning = true;
    spinBtn.disabled = true;
    resultDiv.innerHTML = "🎲 Spinning for luck... Aventurine bless you! 🎲";
    
    balance -= SPIN_COST;
    spinAttempt++;
    updateUI();
    
    let interval = setInterval(() => {
        if (!isSpinning) return;
        reel1.innerText = randSymbol();
        reel2.innerText = randSymbol();
        reel3.innerText = randSymbol();
    }, 70);
    
    setTimeout(() => {
        clearInterval(interval);
        const final = getFinalResult();
        reel1.innerText = final.s1;
        reel2.innerText = final.s2;
        reel3.innerText = final.s3;
        
        if (final.isWin) {
            resultDiv.innerHTML = "✨✨✨ JACKPOT! ✨✨✨<br>🏆 YOU WON 5000 YUAN! 🏆<br>🎁 GO TO THE NEXT ROOM TO CLAIM YOUR PRIZE! 🎁";
            spinBtn.disabled = true;
            balance = 0;
            updateUI();
            document.querySelector('.casino-wrapper').style.boxShadow = "0 0 60px #ff66cc";
        } else {
            if (spinAttempt === 2) {
                resultDiv.innerHTML = "🌸 Last spin will be lucky! Spin again 🌸";
            } else {
                resultDiv.innerHTML = "🍂 Not this time... Aventurine says: try once more! 🍂";
            }
        }
        
        isSpinning = false;
        if (balance >= SPIN_COST && spinAttempt < 3) {
            spinBtn.disabled = false;
        } else if (spinAttempt === 3) {
            spinBtn.disabled = true;
            spinBtn.innerText = "🎁 GO CLAIM YOUR FIGURINE 🎁";
            resultDiv.innerHTML = "🏆💎 YOU WON 5000 YUAN! GO TO THE NEXT ROOM FOR YOUR AVENTURINE FIGURINE + ENVELOPE! 💎🏆";
        }
    }, 1200);
}

spinBtn.addEventListener('click', spin);
updateUI();