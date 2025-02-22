const player = document.getElementById("player");
const platform = document.getElementById("platform");
const gameContainer = document.querySelector(".game-container");

let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
let moveSpeed = 5;  // Speed of movement left and right

// Platform Positioning (relative to the game container)
let platformBottom = parseInt(window.getComputedStyle(platform).getPropertyValue("bottom"));
let platformLeft = parseInt(window.getComputedStyle(platform).getPropertyValue("left"));
let platformWidth = platform.offsetWidth;
let platformHeight = platform.offsetHeight;

document.addEventListener("keydown", (e) => {
    // Jumping functionality (Spacebar)
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        velocity = 12; // Jump velocity
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
        playerBottom += velocity;
        
        // Check for collision with the platform
        if (playerBottom <= platformBottom + platformHeight && 
            playerLeft + player.offsetWidth > platformLeft && 
            playerLeft < platformLeft + platformWidth) {
            
            // Player lands on the platform
            playerBottom = platformBottom + platformHeight;
            isJumping = false; // Stop jumping
            velocity = 0; // Stop downward velocity
        }
    } else {
        // Apply gravity when falling
        if (playerBottom > 0) {
            playerBottom -= gravity; // Apply gravity when falling
        }
    }

    // Debugging logs to check positions
    console.log("Player Bottom: ", playerBottom); // Logs player's vertical position
    console.log("Platform Bottom: ", platformBottom); // Logs platform's vertical position
    console.log("Player Left: ", playerLeft); // Logs player's horizontal position
    console.log("Platform Left: ", platformLeft); // Logs platform's horizontal position

    // Update the player's position
    player.style.bottom = `${playerBottom}px`;
    requestAnimationFrame(gameLoop); // Recursively call gameLoop for animation
}

