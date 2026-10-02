/*
    ==========================================
    COUNTDOWN TIMER
    ==========================================

    Change this date to configure your countdown.

    Format:
    YYYY-MM-DDTHH:MM:SS

    Example:
    "2027-01-01T00:00:00"
*/

const targetDate = new Date("2027-01-01T00:00:00");

// HTML elements
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const timerElement = document.getElementById("timer");
const targetDateText = document.getElementById("targetDateText");
const progressBar = document.getElementById("progressBar");
const progressText = document.querySelector(".progress-text");

// Store the starting time
const startDate = new Date();

// Display target date
targetDateText.textContent = targetDate.toLocaleString("en-IN", {
  dateStyle: "full",
  timeStyle: "short",
});

/*
    Calculate and display countdown
*/
function updateCountdown() {
  const now = new Date();

  // Difference in milliseconds
  const difference = targetDate - now;

  // Countdown completed
  if (difference <= 0) {
    clearInterval(countdownInterval);

    timerElement.innerHTML = `
            <div class="finished">
                🎉 The Moment Has Arrived!
            </div>
        `;

    progressBar.style.width = "100%";
    progressText.textContent = "Countdown completed!";

    return;
  }

  // Convert milliseconds
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  // Update DOM
  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  /*
        Progress bar

        The bar represents the amount of time
        that has passed between the start date
        and the target date.
    */

  const totalDuration = targetDate - startDate;
  const elapsed = now - startDate;

  let progress = (elapsed / totalDuration) * 100;

  progress = Math.min(Math.max(progress, 0), 100);

  progressBar.style.width = `${progress}%`;
}

// Run immediately
updateCountdown();

// Update every second
const countdownInterval = setInterval(updateCountdown, 1000);
