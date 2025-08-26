// === CONFIG ===
const TARGET_DATE = new Date("2025-09-11T16:20:00-04:00"); 
const TARGET_LABEL = "the day I'm reunited with my love"; 

document.getElementById("target-label").textContent = TARGET_LABEL;

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  let diffMs = TARGET_DATE - now;
  if (diffMs < 0) diffMs = 0; // clamp when passed

  const sec = 1000,
    min = 60 * sec,
    hr = 60 * min,
    day = 24 * hr,
    week = 7 * day;
  const weeks = Math.floor(diffMs / week);
  const days = Math.floor((diffMs % week) / day);
  const hours = Math.floor((diffMs % day) / hr);
  const minutes = Math.floor((diffMs % hr) / min);
  const seconds = Math.floor((diffMs % min) / sec);

  document.getElementById("w").textContent = pad(weeks);
  document.getElementById("d").textContent = pad(days);
  document.getElementById("h").textContent = pad(hours);
  document.getElementById("m").textContent = pad(minutes);
  document.getElementById("s").textContent = pad(seconds);

  if (seconds === 0) {
    document.getElementById(
      "sr-announce"
    ).textContent = `${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes remaining`;
  }
}

function spawnHearts() {
  const container = document.getElementById("hearts");
  const count = 40;
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "heart";
    span.textContent = "❤";
    const left = Math.random() * (vw - 20);
    const delay = Math.random() * 8; // s
    const fall = 8 + Math.random() * 10; // s
    const sway = 3 + Math.random() * 4; // s
    const spin = 6 + Math.random() * 8; // s
    span.style.left = left + "px";
    span.style.animationDuration = `${fall}s, ${sway}s, ${spin}s`;
    span.style.animationDelay = `${delay}s, ${delay / 2}s, ${delay / 3}s`;
    span.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    span.style.fontSize = 14 + Math.random() * 18 + "px";
    container.appendChild(span);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
requestAnimationFrame(spawnHearts);
