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

// ----- Love notes / haiku rotator (title + up to 3 lines) -----
const LOVE_NOTES = [
    { title: "Apasionada por ti", lines: [
      "El mar el sol soy",
      "Siente mi frío y mi",
      "Caliente ardor"
    ]},
    { title: "", lines: ["I feel a warm blanket when I read your messages, I feel a wave of emotion crash around me, when I see your face, I feel as if I am seeing a beautiful sunset, I want to count the stars with you, and if it takes forever, well that’s how long I want with you"] },
    { title: "tierra infinita", lines: [
        "agua a tus pies,",
        "el calor besa tu piel,",
        "siempre contigo"
    ]},
    { title: "", lines: ["I want to be the sunrise in your morning, the light in your night, the shore where your waves rest, the answer to your longing, the reason your days are brighter, your storms are calmer, your dreams are sweeter, your skies are clearer, and your heart is lighter"]},
    { title: "", lines: ["mi amor, me he enamorado de ti y ahora el sol brilla mas fuerte, la luna irradia, mi corazon late por ti, te quiero en mi vida por el resto de mi vida"]}, 
    { title: "Je t'appartiens", lines: [
        "ma main, mes lèvres,",
        "mes yeux, pour toujours à toi,",
        "mon amour parfait"
    ]},
    { title: "", lines: ["I’m going to fight for us everyday, so that we can be together for a long time, hopefully forever"]}, 
    { title: "", lines: ["I hope your heart is mine, and if it is, I promise to protect it like the greatest treasure in this world, because it is "]}, 
    { title: "", lines: ["You’re perfect, I love reading your words, you’re my favorite book 💗"]}, 
];
  
  let noteIndex = 0;
  const titleEl = document.getElementById("note-title");
  const lineEls = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3"),
  ];
  
  function renderNote(note){
    // fade out
    [titleEl, ...lineEls].forEach(el => el && el.classList.remove("show"));
  
    setTimeout(() => {
      // title (optional)
      if (note.title && note.title.trim() !== "") {
        titleEl.textContent = note.title;
        titleEl.hidden = false;
      } else {
        titleEl.hidden = true;
      }
  
      // lines (hide unused)
      lineEls.forEach((el, i) => {
        const text = note.lines[i] || "";
        el.textContent = text;
        el.style.display = text ? "block" : "none";
      });
  
      // fade in
      [titleEl, ...lineEls].forEach(el => {
        if (!el.hidden && el.textContent) el.classList.add("show");
      });
    }, 250);
  }
  
  function nextNote(){
    renderNote(LOVE_NOTES[noteIndex]);
    noteIndex = (noteIndex + 1) % LOVE_NOTES.length;
  }
  
  nextNote();
  setInterval(nextNote, 10777); // change every ~4s
  
