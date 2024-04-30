const fruitsAndVegetables = [
    'elma',
    'armut',
    'muz',
    'çilek',
    'domates',
    'salatalık',
    'havuç',
    'patates'
];

let selectedItems = []; // Seçilen kartların içeriği
let selectedIndices = []; // Seçilen kartların dizinleri
let openedCards = []; // Açık kartlar
let babyPosition = 0; // Bebek pozisyonu
let selectedBaby = 0; // Seçilen bebek 

// Bebek seçme işlemini gösteriyor
function selectBaby(baby) {
    selectedBaby = baby; // Seçilen bebeği ayarla
    document.getElementById('baby').src = `bebek${selectedBaby}.jpeg`; // Bebek resmini güncellemek için
    document.getElementById('baby-selection').style.display = 'none'; // Bebek seçim ekranını gizlemek için
    document.getElementById('game-container').style.display = 'block'; // Oyun alanını göstermek için
    generateGameGrid(); // Oyun ızgarasını oluştur
}

// Oyun ızgarasını oluşturma işlemi için
function generateGameGrid() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = ''; // Oyun alanını temizlemek için
    selectedItems = [];
    selectedIndices = [];
    openedCards = [];
    babyPosition = 0;

    // 16 kart oluşturulur ve oyun ızgarasına eklenir
    for (let i = 0; i < 16; i++) {
        const index = Math.floor(Math.random() * fruitsAndVegetables.length);
        const item = fruitsAndVegetables[index];
        selectedItems.push(item);
        selectedIndices.push(index);

        const div = document.createElement('div');
        div.dataset.index = i;
        div.dataset.item = item;
        div.classList.add('card');
        div.addEventListener('click', handleClick);
        gameGrid.appendChild(div);
    }
}

// Kart tıklama işlemi
function handleClick(event) {
    const clickedIndex = event.target.dataset.index;
    const clickedItem = event.target.dataset.item;

    if (!openedCards.includes(clickedIndex) && openedCards.length < 2) {
        event.target.style.backgroundImage = `url('${clickedItem}.jpeg')`;
        openedCards.push(clickedIndex);

        if (openedCards.length === 2) {
            setTimeout(checkCards, 1000);
        }
    }
}

// Kartları kontrol etme işlemi
function checkCards() {
    const firstIndex = openedCards[0];
    const secondIndex = openedCards[1];

    const firstItem = selectedItems[firstIndex];
    const secondItem = selectedItems[secondIndex];

    if (firstItem === secondItem) {
        openedCards = [];
        promptAndCheckMatch(firstItem);
    } else {
        const firstCard = document.querySelector(`[data-index="${firstIndex}"]`);
        const secondCard = document.querySelector(`[data-index="${secondIndex}"]`);

        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';

        openedCards = [];
    }
}

// Tahmin yapma ve eşleşme kontrolü işlemi
function promptAndCheckMatch(item) {
    const guess = prompt(`bulduğunuz meyve/sebzenin adını  giriniz:`);

    if (guess && guess.toLowerCase() === item) {
        alert('Tebrikler! Doğru girdiniz.');
        increaseBabySize();
    } else {
        alert(`Yanlış! Doğru cevap: ${item}`);
    }
}

// Bebek boyutunu arttırma işlemi
function increaseBabySize() {
    const babyImage = document.getElementById('baby');
    const babyContainer = document.getElementById('baby-container');
    
    // Bebek resminin genişlik ve yüksekliğini %35 oranında arttır
    const currentWidth = babyImage.clientWidth; 
    const currentHeight = babyImage.clientHeight;
    const newWidth = currentWidth * 1.35;
    const newHeight = currentHeight * 1.35;
    
    // Yeni genişlik ve yüksekliği ayarla
    babyImage.style.width = `${newWidth}px`;
    babyImage.style.height = `${newHeight}px`;
    
    // Bebek resminin konumunu ayarla
    babyContainer.style.marginLeft = `-${(newWidth - currentWidth) / 2}px`;
    babyContainer.style.marginTop = `-${(newHeight - currentHeight) / 2}px`;
}

// Oyunu sıfırlama işlemi
function resetGame() {
    const result = document.getElementById('result');
    result.textContent = '';
    const babySelection = document.getElementById('baby-selection');
    babySelection.style.display = 'block'; // Bebek seçim ekranını göster
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'none'; // Oyun alanını gizle
}

generateGameGrid(); // Oyun ızgarasını oluşturma işlemini başlat
