// Now, we need to solve a problem to make the app update not the full DOM, but only parts of the code that actually changed.
// To do this, we can consider commented option. 

// const app = document.getElementById("app");

// let count = 0;

// app.innerHTML = `
//   <h1>Counter App Using Render Function</h1>

//   <div id="count" class="countStyles">Count: ${count}</div>
//   <div id="count-2" class="countStyles">Count: ${count}</div>
//   <div id="count-3" class="countStyles">Count: ${count}</div>
//   <div id="count-4" class="countStyles">Count: ${count}</div>
//   <div id="count-5" class="countStyles">Count: ${count}</div>
//   <div id="count-6" class="countStyles">Count: ${count}</div>
//   <div id="count-7" class="countStyles">Count: ${count}</div>
//   <div id="count-8" class="countStyles">Count: ${count}</div>
//   <div id="count-9" class="countStyles">Count: ${count}</div>
//   <div id="count-10" class="countStyles">Count: ${count}</div>

//   <div class="buttonsStyles">
//     <button id="inc">+</button>
//     <button id="dec">-</button>
//   </div>
// `;

// const count1 = document.getElementById("count");
// const count2 = document.getElementById("count-2");
// const count3 = document.getElementById("count-3");
// const count4 = document.getElementById("count-4");
// const count5 = document.getElementById("count-5");
// const count6 = document.getElementById("count-6");
// const count7 = document.getElementById("count-7");
// const count8 = document.getElementById("count-8");
// const count9 = document.getElementById("count-9");
// const count10 = document.getElementById("count-10");

// const incButton = document.getElementById("inc");
// const decButton = document.getElementById("dec");

// function updateCounts() {
//   count1.textContent = `Count: ${count}`;
//   count2.textContent = `Count: ${count}`;
//   count3.textContent = `Count: ${count}`;
//   count4.textContent = `Count: ${count}`;
//   count5.textContent = `Count: ${count}`;
//   count6.textContent = `Count: ${count}`;
//   count7.textContent = `Count: ${count}`;
//   count8.textContent = `Count: ${count}`;
//   count9.textContent = `Count: ${count}`;
//   count10.textContent = `Count: ${count}`;
// }

// incButton.addEventListener("click", () => {
//   count = count + 1;
//   updateCounts();
// });

// decButton.addEventListener("click", () => {
//   count = count - 1;
//   updateCounts();
// });

const app = document.getElementById("app");

let count = 0;

function render() {
  return {
    type: "div",
    props: {
      children: [
        {
          type: "h1",
          props: {
            children: `Count: ${count}`
          }
        },
        {
          type: "button",
          props: {
            id: "inc",
            children: "+"
          }
        },
        {
          type: "button",
          props: {
            id: "dec",
            children: "-"
          }
        }
      ]
    }
  };
}


function createDomNode(vnode) {
  const dom = document.createElement(vnode.type);

  if (vnode.props.id) {
    dom.id = vnode.props.id;
  }

  if (typeof vnode.props.children === "string") {
    dom.textContent = vnode.props.children;
  }

  if (Array.isArray(vnode.props.children)) {
    vnode.props.children.forEach((child) => {
      const childDom = createDomNode(child);
      dom.appendChild(childDom);
    });
  }

  return dom;
}

let currentTree = render();
let rootDom = createDomNode(currentTree);
app.appendChild(rootDom);

document.getElementById("inc").addEventListener("click", () => {
  count = count + 1;
  updateApp();
});

document.getElementById("dec").addEventListener("click", () => {
  count = count - 1;
  updateApp();
});

function updateApp() {
  const newTree = render();
  
  const oldText = currentTree.props.children[0].props.children;
  const newText = newTree.props.children[0].props.children;

  if (oldText !== newText) {
    rootDom.children[0].textContent = newText;
  }
}