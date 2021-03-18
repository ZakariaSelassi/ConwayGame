const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const game = new GameOfLife();

game.gameSet();

window.onload = () => {
    document.querySelector("#start-random").addEventListener("click", () => {

        game.arrayRand();
        game.fillArray();
        window.setInterval(() => {
            game.runGame();
        }, 300)
    })
}