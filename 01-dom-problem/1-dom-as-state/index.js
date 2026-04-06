const countEl = document.getElementById("count");
const countEl2 = document.getElementById("count-2");
const countEl3 = document.getElementById("count-3");
const countEl4 = document.getElementById("count-4");
const countEl5 = document.getElementById("count-5");
const countEl6 = document.getElementById("count-6");
const countEl7 = document.getElementById("count-7");
const countEl8 = document.getElementById("count-8");
const countEl9 = document.getElementById("count-9");
const countEl10 = document.getElementById("count-10");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const countsPageBtn = document.getElementById("counts-page");

let count = 0;

incBtn.addEventListener("click", () => {
  count = count + 1;
  countEl.textContent = count; // Notice how we have to manually update each count element
  countEl2.textContent = count; // In that case, we could have 'hacked' it, but it would be hard to maintain it in a bigger app, where we need to stricty follow requirements
  countEl3.textContent = count;
  countEl4.textContent = count;
  countEl5.textContent = count;
  countEl6.textContent = count;
  countEl7.textContent = count;
  countEl8.textContent = count;
  countEl9.textContent = count;
  countEl10.textContent = count;
});

decBtn.addEventListener("click", () => {
  count = count - 1;
  countEl.textContent = count;
  countEl2.textContent = count;
  countEl3.textContent = count;
  countEl4.textContent = count;
  countEl5.textContent = count;
  countEl6.textContent = count;
  countEl7.textContent = count;
  countEl8.textContent = count;
  countEl9.textContent = count;
  countEl10.textContent = count;
});

countsPageBtn.addEventListener("click", () => {
  window.location.href = "counts.html";
});
