// Funktion, um den Flip-Soundeffekt abzuspielen
export const playFlipSound = () => {
    const flipSound = new Audio("/sounds/flipcard-91468.mp3");
    flipSound.play();
};

// Funktion, um den Pounding-Soundeffekt abzuspielen
export const playPoundingSound = () => {
    const poundingSound = new Audio("/sounds/pounding-cards-on-table-99355.mp3");
    poundingSound.play();
};

// Funktion, um den Shuffle-und-Cardflip-Soundeffekt abzuspielen
export const playShuffleAndCardFlipSound = () => {
    const shuffleAndCardFlipSound = new Audio("/sounds/shuffleandcardflip1-40942.mp3");
    shuffleAndCardFlipSound.play();
    console.log("startersound")
}