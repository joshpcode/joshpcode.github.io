const player = document.getElementById("player");
const platform = document.getElementById("platform");
const gameContainer = document.querySelector(".game-container");

let isJumping = false;
let gravity = 0.8;  // How strong gravity is
let velocity = 0;  // Velocity of the jump or fall
let moveSpeed = 5;  // Speed of player movement (left/right)

let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

// Platform properties
let platformBottom = parseInt(window.getComputedStyle(platform).getPropertyValue("bottom"));
let platformLeft = parseInt(window.getComputedStyle(platform).getPropertyValue("left"));
let platformWidth = platform.offsetWidth;
let platformHeight = platform.offsetHeight;

document.addEventListener("keydown", (e) => {
    // Jumping functionality (Spacebar)
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        velocity = 12;  // Jump velocity
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
        velocity -= gravity; // Simulate gravity pulling the player down
        playerBottom += velocity; // Apply gravity effect

        // Check if player lands on the platform
        if (playerBottom <= platformBottom + platformHeight && 
            playerLeft + player.offsetWidth > platformLeft && 
            playerLeft < platformLeft + platformWidth) {
            
            // Player lands on the platform
            playerBottom = platformBottom + platformHeight; // Stop at the platform
            isJumping = false; // No longer jumping
            velocity = 0; // Reset downward velocity
        }
    } else {
        // Apply gravity when falling (only when player is not on the platform)
        if (playerBottom > 0) {
            playerBottom -= gravity; // Apply gravity
        }
    }

    // Prevent the player from going below the ground (bottom of the game container)
    if (playerBottom < 0) {
        playerBottom = 0;
    }

    // Update player's position
    player.style.bottom = `${playerBottom}px`;
    requestAnimationFrame(gameLoop); // Keep the game running
}

gameLoop();
