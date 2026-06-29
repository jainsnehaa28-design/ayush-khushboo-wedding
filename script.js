/* =========================================================
   AYUSH & KHUSHBOO — site interactivity
   ========================================================= */

/* ---------- EVENT DATA (edit here to change events) ---------- */
const EVENTS = [
  {
    date: "27TH JANUARY 2027",
    name: "Myra",
    theme: "Blessings & Beginnings",
    desc: "A sacred morning ritual blessing the couple ahead of the celebrations.",
    color: "linear-gradient(160deg, #caa6c9, #8a6a9c)"
  },
  {
    date: "27TH JANUARY 2027",
    name: "Sangeet",
    theme: "Underground Nights",
    desc: "An evening of music, dance, and dazzling performances under the stars.",
    color: "linear-gradient(160deg, #2c3e52, #1a2433)"
  },
  {
    date: "28TH JANUARY 2027",
    name: "Carnival",
    theme: "Colour Rush",
    desc: "A playful daytime carnival full of colour, games, and laughter.",
    color: "linear-gradient(160deg, #e8c46a, #c98a3f)"
  },
  {
    date: "28TH JANUARY 2027",
    name: "Baarat",
    theme: "The Grand Procession",
    desc: "The groom's joyous procession arrives in true royal Rajasthani style.",
    color: "linear-gradient(160deg, #b8862e, #7a1f2b)"
  },
  {
    date: "28TH JANUARY 2027",
    name: "Pheras",
    theme: "The Wedding Vows",
    desc: "Seven sacred steps around the holy fire, uniting two souls as one.",
    color: "linear-gradient(160deg, #f4e8d8, #cbb389)"
  },
  {
    date: "28TH JANUARY 2027",
    name: "Reception",
    theme: "Shaam Shaandaar",
    desc: "A glamorous evening of celebration with family, friends, and fine dining.",
    color: "linear-gradient(160deg, #5c1620, #2a0c10)"
  }
];

/* ---------- COUNTDOWN TARGET ---------- */
/* Counting down to 27th January 2027, 12:00 PM (Myra, first event). */
const COUNTDOWN_TARGET = new Date("2027-01-27T12:00:00+05:30").getTime();

/* =========================================================
   PETAL FIELD
   ========================================================= */
function spawnPetals(){
  const field = document.getElementById("petalField");
  if(!field) return;
  const count = window.innerWidth < 500 ? 10 : 18;
  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.className = "petal";
    const left = Math.random()*100;
    const duration = 10 + Math.random()*12;
    const delay = Math.random()*-20;
    const size = 0.6 + Math.random()*0.8;
    p.style.left = left+"vw";
    p.style.animationDuration = duration+"s";
    p.style.animationDelay = delay+"s";
    p.style.transform = `scale(${size})`;
    field.appendChild(p);
  }
}

/* =========================================================
   GATE (tap to open)
   ========================================================= */
function setupGate(){
  const gate = document.getElementById("gate");
  const btn = document.getElementById("tapOpenBtn");
  if(!gate || !btn) return;
  btn.addEventListener("click", () => {
    gate.classList.add("is-hidden");
    document.body.style.overflow = "auto";
  });
}

/* =========================================================
   COUNTDOWN
   ========================================================= */
function setupCountdown(){
  const els = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    mins: document.getElementById("cdMins"),
    secs: document.getElementById("cdSecs"),
  };
  if(!els.days) return;

  function tick(){
    const now = Date.now();
    let diff = COUNTDOWN_TARGET - now;
    if(diff < 0) diff = 0;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2,"0");
    els.hours.textContent = String(hours).padStart(2,"0");
    els.mins.textContent = String(mins).padStart(2,"0");
    els.secs.textContent = String(secs).padStart(2,"0");
  }
  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   EVENT CAROUSEL
   ========================================================= */
function setupCarousel(){
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("dots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if(!track) return;

  let current = 0;
  let flipped = new Set();

  // build cards
  EVENTS.forEach((ev, i) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.dataset.index = i;
    card.innerHTML = `
      <div class="face front">
        <div class="face-bg" style="background:${ev.color}"></div>
        <div class="face-scrim"></div>
        <div class="face-text">
          <p class="ev-date">${ev.date}</p>
          <p class="ev-name script">${ev.name}</p>
          <p class="ev-theme">${ev.theme}</p>
        </div>
      </div>
      <div class="face back">
        <p class="ev-name script">${ev.name}</p>
        <p class="ev-desc">${ev.desc}</p>
      </div>
    `;
    card.addEventListener("click", () => onCardClick(i));
    track.appendChild(card);
  });

  // build dots
  EVENTS.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot";
    dotsWrap.appendChild(d);
  });

  function onCardClick(i){
    if(i === current){
      // flip
      if(flipped.has(i)) flipped.delete(i); else flipped.add(i);
      render();
    } else {
      current = i;
      render();
    }
  }

  function render(){
    const cards = track.querySelectorAll(".event-card");
    const dots = dotsWrap.querySelectorAll(".dot");
    const n = EVENTS.length;

    cards.forEach((card, i) => {
      card.classList.toggle("is-flipped", flipped.has(i));
      let rel = (i - current + n) % n;
      // normalize to -2..-1..0..1..2 range based on shortest path
      if(rel > n/2) rel -= n;

      card.classList.remove("pos-center","pos-left1","pos-right1","pos-left2","pos-right2","pos-hidden");
      if(rel === 0) card.classList.add("pos-center");
      else if(rel === -1) card.classList.add("pos-left1");
      else if(rel === 1) card.classList.add("pos-right1");
      else if(rel === -2) card.classList.add("pos-left2");
      else if(rel === 2) card.classList.add("pos-right2");
      else card.classList.add("pos-hidden");
    });

    dots.forEach((d,i) => d.classList.toggle("active", i===current));
  }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + EVENTS.length) % EVENTS.length;
    render();
  });
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % EVENTS.length;
    render();
  });

  render();
}

/* =========================================================
   FIREBASE — RSVP + WISHES
   (firebase-config.js must run before this file and define
    window.firebaseDB, or these functions fall back to a
    friendly "not connected yet" message.)
   ========================================================= */
function getDB(){
  return window.firebaseDB || null;
}

function setupRSVP(){
  const form = document.getElementById("rsvpForm");
  const status = document.getElementById("rsvpStatus");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const db = getDB();
    const name = document.getElementById("rsvpName").value.trim();
    const guests = document.getElementById("rsvpGuests").value;
    const attending = document.getElementById("rsvpAttending").value;

    if(!db){
      status.textContent = "RSVP saved locally — connect Firebase to store this for real (see firebase-config.js).";
      form.reset();
      return;
    }

    try{
      status.textContent = "Sending...";
      await db.ref("rsvps").push({
        name, guests, attending, ts: Date.now()
      });
      status.textContent = "Thank you! Your RSVP has been received. 💛";
      form.reset();
    } catch(err){
      console.error(err);
      status.textContent = "Something went wrong — please try again.";
    }
  });
}

function setupWishes(){
  const form = document.getElementById("wishForm");
  const status = document.getElementById("wishStatus");
  const list = document.getElementById("wishesList");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const db = getDB();
    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();

    if(!db){
      status.textContent = "Wish saved locally — connect Firebase to share this with everyone (see firebase-config.js).";
      form.reset();
      return;
    }

    try{
      status.textContent = "Sending...";
      await db.ref("wishes").push({
        name, message, ts: Date.now()
      });
      status.textContent = "Thank you for your kind words! 💛";
      form.reset();
    } catch(err){
      console.error(err);
      status.textContent = "Something went wrong — please try again.";
    }
  });

  // live-load wishes if Firebase is connected
  const db = getDB();
  if(db){
    db.ref("wishes").orderByChild("ts").on("value", (snapshot) => {
      const data = snapshot.val();
      list.innerHTML = "";
      if(!data){
        list.innerHTML = `<p class="wishes-empty">Be the first to leave a wish!</p>`;
        return;
      }
      const items = Object.values(data).sort((a,b) => (b.ts||0) - (a.ts||0));
      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "wish-item";
        div.innerHTML = `
          <span class="wish-heart">♥</span>
          <p class="wish-msg">"${escapeHtml(item.message)}"</p>
          <p class="wish-author">— ${escapeHtml(item.name)}</p>
        `;
        list.appendChild(div);
      });
    });
  } else {
    list.innerHTML = `<p class="wishes-empty">Connect Firebase to display guest wishes here.</p>`;
  }
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  spawnPetals();
  setupGate();
  setupCountdown();
  setupCarousel();
  setupRSVP();
  setupWishes();
});
