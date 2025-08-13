const goToMainMenu = () => {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.style.display = "none";
  });

  // Show the main menu screen
  document.getElementById("main-menu").style.display = "block";
};
