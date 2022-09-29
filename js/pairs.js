(function() {
    const CONTAINER = document.getElementById('pairs-app');
    const CARDS_ARRAY = [];
    let numbersArray = [];
    let openedCards = [];
    let preSetCardCount = 8;
    let firstCard, secondCard;

    // создаю карточки отталкиваясь от числа инпута
    function createCards(count) {
        document.body.append(CONTAINER);
        CONTAINER.classList.add('field-4x4');
        createCardContent(preSetCardCount);
        shuffleArr(numbersArray);

        for (let i = 0; i < count * 2; i++) {
            let card = document.createElement('button');
            card.classList.add('card', 'hover', 'cards-backside');
            card.textContent = numbersArray[i];
            card.style.fontSize = 0;
            card.addEventListener('click', flipCard)
            CONTAINER.append(card);
            CARDS_ARRAY.push(card);
        }
        return CARDS_ARRAY
    };  

    // создаю массив чисел на основе числа инпута
    function createCardContent(num) {
        for (let i = 1; i <= num * 2; i++) {
            let temp = i;
            if (temp <= num) {
                numbersArray.push(temp);
            }
        }
        for (let i = 1; i <= num * 2; i++) {
            let temp = i;
            if (temp <= num) {
                numbersArray.push(temp)
            }
        }
    };

    // перемешиваю массив с контентом
    function shuffleArr(arr) {
        let j,
            temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr
    };

    function flipCard() {
        this.classList.remove('cards-backside');
        
        if (this === firstCard) return;

        if (!firstCard) {
            firstCard = this;
            firstCard.style.fontSize = 90 + 'px'
            return
        } else if (this === firstCard && !this.hasAttribute('data-set')) {
            firstCard = this
            firstCard.style.fontSize = 90 + 'px'
            return
        } else {
            secondCard = this
            secondCard.style.fontSize = 90 + 'px'
        }        
        checkMatch();  
    }

    
    function checkMatch() {
        if (firstCard.textContent === secondCard.textContent) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard.classList.add('card-match');
            secondCard.classList.add('card-match');
            firstCard.classList.remove('hover');
            secondCard.classList.remove('hover');
            firstCard.setAttribute('data-set', 'bingo');
            secondCard.setAttribute('data-set', 'bingo');
            openedCards.push(firstCard, secondCard);
            setTimeout(() => checkAllCards(openedCards, preSetCardCount), 500)
            firstCard = '';
            secondCard = '';
        } else if (firstCard.textContent !== secondCard.textContent) {
            CARDS_ARRAY.forEach(elem => {
                elem.removeEventListener('click', flipCard);
            })
            firstCard.classList.toggle('card-dismatch');
            secondCard.classList.toggle('card-dismatch');
            firstCard.classList.remove('hover');
            secondCard.classList.remove('hover');
            setTimeout(() => {
                CARDS_ARRAY.forEach(elem => {
                    elem.addEventListener('click', flipCard);
                })
                firstCard.classList.add('cards-backside');
                secondCard.classList.add('cards-backside');
                firstCard.classList.toggle('card-dismatch');
                secondCard.classList.toggle('card-dismatch');
                secondCard.style.fontSize = 0;
                firstCard.style.fontSize = 0;
                firstCard = '';
                secondCard = '';
            }, 1000)
        }
    }

    function checkAllCards(arr, num) {
        if (arr.length === num * 2) {
            confirm('Начать сначала?');
            if ('yes') {
                numbersArray = [];
                CONTAINER.replaceChildren()
                createCards(preSetCardCount)
                createCardContent(preSetCardCount);
                shuffleArr(numbersArray);
            }
        }
    }
    


    
    
    createCards(preSetCardCount)
})();