const app = document.getElementById("app");

let count = 0;

function render() { // let's try to turn our DOM into a JS object (it's the same DOM but as a JS object)
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

 
function createRealDom(virtualDom) { // then based on out JS object representation of the DOM, we can create the real DOM 
  const realDom = document.createElement(virtualDom.type);

  if (virtualDom.props.id) {
    realDom.id = virtualDom.props.id;
  }

  if (typeof virtualDom.props.children === "string") {
    realDom.textContent = virtualDom.props.children;
  }

  if (Array.isArray(virtualDom.props.children)) {
    virtualDom.props.children.forEach((child) => {
      const childDom = createRealDom(child);
      realDom.appendChild(childDom);
    });
  }

  return realDom;
}

let currentVirtualDom = render(); // initial virtual DOM (JS object representation of the DOM)
let realDom = createRealDom(currentTree); // create the real DOM from the virtual DOM
app.appendChild(realDom); // mount the real DOM to the app

document.getElementById("inc").addEventListener("click", () => { // increment the count
  count = count + 1;
  updateApp();
});

document.getElementById("dec").addEventListener("click", () => { // decrement the count
  count = count - 1;
  updateApp();
});

function updateApp() { // Here happens all the magic. We compare old and new virtual DOMs and only update the parts that were changed.
  const newVirtualDom = render(); // new virtual DOM (JS object representation of the DOM)
  
  const oldText = currentVirtualDom.props.children[0].props.children; // old text content of the first child
  const newText = newVirtualDom.props.children[0].props.children; // new text content of the first child

  if (oldText !== newText) { // if the text content is different, update the text content of the first child
    realDom.children[0].textContent = newText; // update the text content of the first child in the real DOM
  }

  currentVirtualDom = newVirtualDom;
}