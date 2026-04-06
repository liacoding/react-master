const app = document.getElementById("app");

let count = 0;

function render() {
  app.innerHTML = `
       <h1>Counter App Using Render Function</h1>
        
        <div id="count" class="countStyles">Count: ${count}</div>
        <div id="count-2" class="countStyles">Count: ${count}</div>
        <div id="count-3" class="countStyles">Count: ${count}</div>
        <div id="count-4" class="countStyles">Count: ${count}</div>
        <div id="count-5" class="countStyles">Count: ${count}</div>
        <div id="count-6" class="countStyles">Count: ${count}</div>
        <div id="count-7" class="countStyles">Count: ${count}</div>
        <div id="count-8" class="countStyles">Count: ${count}</div>
        <div id="count-9" class="countStyles">Count: ${count}</div>
        <div id="count-10" class="countStyles">Count: ${count}</div>

        <div class="buttonsStyles">
          <button id="inc">+</button>
          <button id="dec">-</button>
        </div>
  `;

  document.getElementById("inc").addEventListener("click", () => {
    count = count + 1;
    render();
  });

  document.getElementById("dec").addEventListener("click", () => {
    count = count - 1;
    render();
  });
}

render();