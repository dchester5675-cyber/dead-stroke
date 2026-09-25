const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const hub = document.getElementById("hub");
const meta = document.getElementById("meta");
const spinBtn = document.getElementById("spin");

let mode = "rack";
let preferHard = false;
let angle = -Math.PI / 2;
let spinning = false;
let current = null;
let showingHard = false;
let p1Turn = true;
const used = { rack: new Set(), foul: new Set(), claim: new Set() };

function slices() {
  return DATA[mode].filter(s => !used[mode].has(s.id));
}

function drawWheel() {
  const s = slices();
  const cx = canvas.width / 2, cy = canvas.height / 2, r = canvas.width * 0.46;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle + Math.PI / 2);
  if (!s.length) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = "#161616";
    ctx.fill();
    ctx.restore();
    return;
  }
  const arc = Math.PI * 2 / s.length;
  s.forEach((item, i) => {
    const a0 = i * arc - Math.PI / 2;
    const a1 = a0 + arc;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, a0, a1);
    ctx.closePath();
    const ball = BALL_COLORS[item.id];
    if (ball) ctx.fillStyle = ball.fill;
    else if (mode === "foul") ctx.fillStyle = i % 2 ? "#3a1010" : "#1a1a1c";
    else ctx.fillStyle = i % 2 ? "#2a2312" : "#16140f";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.45)";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (ball && ball.stripe) {
      ctx.save();
      ctx.clip();
      ctx.fillStyle = "#f4f0e6";
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.74, 0, Math.PI * 2);
      ctx.arc(0, 0, r * 0.46, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    const mid = a0 + arc / 2;
    ctx.rotate(mid);
    ctx.fillStyle = ball ? ball.text : "#f1eee8";
    ctx.font = "700 30px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(r * 0.72, 0);
    if (Math.cos(mid) < 0) ctx.rotate(Math.PI);
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#c6a44a";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();
}

function pointerIndex() {
  const s = slices();
  if (!s.length) return 0;
  const tau = Math.PI * 2;
  let a = (-angle) % tau;
  if (a < 0) a += tau;
  return Math.floor(a / (tau / s.length)) % s.length;
}

function tick() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "square";
    o.frequency.value = 180;
    g.gain.value = 0.03;
    o.connect(g); g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + 0.03);
  } catch (e) {}
}

function spin() {
  const s = slices();
  if (spinning || !s.length) return;
  spinning = true;
  spinBtn.disabled = true;
  const extra = (5 + Math.random() * 4) * Math.PI * 2;
  const targetSlice = Math.floor(Math.random() * s.length);
  const arc = Math.PI * 2 / s.length;
  const targetAngle = -targetSlice * arc - arc / 2;
  const start = angle;
  const end = angle + extra + ((targetAngle - (angle % (Math.PI * 2))) + Math.PI * 4);
  const dur = 4200;
  const t0 = performance.now();
  let lastIdx = pointerIndex();
  function frame(now) {
    const t = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - t, 3);
    angle = start + (end - start) * e;
    drawWheel();
    const idx = pointerIndex();
    if (idx !== lastIdx) { tick(); lastIdx = idx; }
    if (t < 1) requestAnimationFrame(frame);
    else {
      spinning = false;
      spinBtn.disabled = false;
      openResult(s[pointerIndex()]);
    }
  }
  requestAnimationFrame(frame);
}

function openResult(item) {
  current = item;
  showingHard = preferHard;
  renderCard();
  document.getElementById("modal").classList.add("on");
  hub.textContent = item.label;
}

function renderCard() {
  if (!current) return;
  document.getElementById("mNum").textContent = current.id.length <= 2 ? "BALL " + current.id : current.id;
  document.getElementById("mCat").textContent = current.cat;
  document.getElementById("mQ").textContent = showingHard ? current.hard : current.q;
  document.getElementById("mHint").textContent = current.hint;
  document.getElementById("swapQ").textContent = showingHard ? "Softer version" : "Harder version";
}

function setMode(next) {
  mode = next;
  document.querySelectorAll(".modes .chip").forEach(c => c.classList.toggle("on", c.dataset.wheel === next));
  const rules = next === "rules";
  document.getElementById("playUI").classList.toggle("hidden", rules);
  document.getElementById("rulesUI").classList.toggle("hidden", !rules);
  if (!rules) { drawWheel(); updateMeta(); }
}

function updateMeta() {
  const left = slices().length;
  const who = p1Turn ? "P1 spins - P2 answers" : "P2 spins - P1 answers";
  meta.textContent = left ? (who + " - " + left + " live") : "Wheel empty. New rack or take a Claim.";
  spinBtn.disabled = !left;
}

document.querySelectorAll(".modes .chip").forEach(c => c.onclick = () => setMode(c.dataset.wheel));
document.getElementById("p1").onclick = () => { p1Turn = true; document.getElementById("p1").classList.add("on"); document.getElementById("p2").classList.remove("on"); updateMeta(); };
document.getElementById("p2").onclick = () => { p1Turn = false; document.getElementById("p2").classList.add("on"); document.getElementById("p1").classList.remove("on"); updateMeta(); };
spinBtn.onclick = spin;
document.getElementById("harderBtn").onclick = function () {
  preferHard = !preferHard;
  this.style.borderColor = preferHard ? "#c6a44a" : "";
  this.style.color = preferHard ? "#c6a44a" : "";
};
document.getElementById("reset").onclick = () => { used[mode] = new Set(); drawWheel(); updateMeta(); };
document.getElementById("swapQ").onclick = () => { showingHard = !showingHard; renderCard(); };
document.getElementById("keep").onclick = () => {
  document.getElementById("modal").classList.remove("on");
  p1Turn = !p1Turn;
  document.getElementById("p1").classList.toggle("on", p1Turn);
  document.getElementById("p2").classList.toggle("on", !p1Turn);
  updateMeta();
};
document.getElementById("close").onclick = () => {
  if (current) used[mode].add(current.id);
  document.getElementById("modal").classList.remove("on");
  p1Turn = !p1Turn;
  document.getElementById("p1").classList.toggle("on", p1Turn);
  document.getElementById("p2").classList.toggle("on", !p1Turn);
  drawWheel(); updateMeta();
};
canvas.addEventListener("click", spin);
hub.style.pointerEvents = "none";
function boot() { drawWheel(); updateMeta(); }
boot();
requestAnimationFrame(boot);
window.addEventListener("load", boot);
window.addEventListener("resize", boot);
