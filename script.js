const player = document.getElementById("player");
const platform = document.getElementById("platform");
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
let gameContainerBottom = gameContainer.offsetHeight;

let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && playerBottom <= platformBottom + platformHeight) {
        // Jump only if player is on the platform or at the ground
        isJumping = true
