const player = document.getElementById("player");
const platform = document.getElementById("platform");
const floor = document.getElementById("floor");
const gameContainer = document.querySelector(".game-container");

let isJumping = false;
let gravity = 0.8;  // Gravity strength (affects falling speed)
let velocity = 0;  // Vertical speed (falling or jumping)
let moveSpeed = 3;  // Horizontal movement speed
let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
let platformBottom = parseInt(window.getComputedStyle(platform).getPropertyValue("bottom"));
let platformLeft = parseInt(window.getComputedStyle(platform).getPropertyValue("left"));
let platformWidth = platform.offsetWidth;
let platformHeight = platform.offsetHeight;
let floorTop = floor.offsetTop;  // The top of the floor

let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && playerBottom <= platformBottom + platformHeight) {
        // Jump only if player is on the platform or at the ground
        isJumping = true;
        velocity = 12;  // Jump velocity
    }

    // Left movement
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isMovingLeft = true;
    }

    // Right movement
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        isMovingRight = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isMovingLeft = false;
    }

    if (e.code === "ArrowRight" || e.code === "KeyD") {
        isMovingRight = false;
    }
});

function gameLoop() {
    // Apply gravity and jumping behavior
    if (isJumping) {
        velocity -= gravity;  // Apply gravity to simulate falling
        playerBottom += velocity;  // Update the player's vertical position
    } else {
        // If the player is not jumping, they should fall due to gravity
        if (playerBottom > 0) {
            velocity -= gravity;  // Apply gravity continuously
            playerBottom += velocity;  // Update position
        }
    }

    // Platform Collision Logic (Landing on the platform)
    if (playerBottom <= platformBottom + platformHeight &&
        playerLeft + player.offsetWidth > platformLeft &&
        playerLeft < platformLeft + platformWidth && velocity < 0) {
        // The player is falling, and has collided with the platform
        playerBottom = platformBottom + platformHeight;  // Correct position to land on the platform
        velocity = 0;  // Stop downward velocity (stop falling)
        isJumping = false;  // Stop jumping as player is now on the platform
    }

    // Prevent player from falling below the game container's bottom boundary (land on the floor)
    if (playerBottom <= floorTop + 20 && velocity < 0) {
        playerBottom = floorTop + 20;  // Correct position to land on the floor
        velocity = 0;  // Stop downward velocity (stop falling)
    }

    // Smooth left/right movement
    if (isMovingLeft && playerLeft > 0) {
        playerLeft -= moveSpeed;
    }
    if (isMovingRight && playerLeft < gameContainer.offsetWidth - player.offsetWidth) {
        playerLeft += moveSpeed;
    }

    // Update player's position
    player.style.bottom = `${playerBottom}px`;
    player.style.left = `${playerLeft}px`;

    requestAnimationFrame(gameLoop);  // Keep the game running smoothly
}

gameLoop();
