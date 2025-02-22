const player = document.getElementById("player");
const platform = document.getElementById("platform");
const gameContainer = document.querySelector(".game-container");

let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
let moveSpeed = 5;  // Speed of movement left and right

// Get platform position
let platformBottom = parseInt(window.getComputedStyle(platform).getPropertyValue("bottom"));
let platformLeft = parseInt(window.getComputedStyle(platform).getPropertyValue("left"));
let platformWidth = platform.offsetWidth;

document.addEventListener("keydown", (e) => {
    // Jumping functionality (Spacebar)
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        velocity = 12;
    }

    // Moving left (ArrowLeft or A)
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        if (playerLeft > 0) {  // Prevent moving off the screen to the left
            playerLeft -= moveSpeed;
            player.style.left = `${playerLeft}px`;
        }
    }

    // Moving right (ArrowRight or D)
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        if (playerLeft < gameContainer.offsetWidth - player.offsetWidth) {  // Prevent moving off the screen to the right
            playerLeft += moveSpeed;
            player.style.left = `${playerLeft}px`;
        }
    }
});

function gameLoop() {
    // Apply gravity and jumping behavior
    if (isJumping) {
        velocity -= gravity;
        playerBottom += velocity;
        
        // Prevent the player from falling through the platform
        if (playerBottom <= platformBottom + platform.offsetHeight && 
            playerLeft + player.offsetWidth > platformLeft && 
            playerLeft < platformLeft + platformWidth) {
            playerBottom = platformBottom + platform.offsetHeight; // Stop at platform
            isJumping = false; // The player lands
        }
    } else {
        // Apply gravity when falling
        if (playerBottom > 0) {
            playerBottom -= gravity; 
        }
    }

    // Update the player's position
    player.style.bottom = `${playerBottom}px`;
    requestAnimationFrame(gameLoop);
}

gameLoop();
