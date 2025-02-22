const player = document.getElementById("player");
const platform = document.getElementById("platform");
const gameContainer = document.querySelector(".game-container");

let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        velocity = 12;
    }
});

function gameLoop() {
    if (isJumping) {
        velocity -= gravity;
        playerBottom += velocity;
        
        if (playerBottom <= 50) {
            playerBottom = 50; // Stop at platform height
            isJumping = false;
        }
    } else {
        if (playerBottom > 0) {
            playerBottom -= gravity; // Apply gravity when falling
        }
    }

    player.style.bottom = `${playerBottom}px`;
    requestAnimationFrame(gameLoop);
}

gameLoop();
