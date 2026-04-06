const app = document.getElementById("app");

let count = 0;

function Title(value) { // We separated the title element to its own function component 
  return {
    type: "h1",
    props: {
      children: `Count: ${value}`
    }
  };
}

function Controls() { // We separated the buttons element to its own function component 
  return {
    type: "div",
    props: {
      children: [
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

function render() { // We combined the components in render() function
  return {
    type: "div",
    props: {
      children: [
        Title(count),
        Controls()
      ]
    }
  };
}

 
function createDomNode(vnode) { // then based on out JS object representation of the DOM, we can create the real DOM 
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

let currentTree = render(); // initial virtual DOM (JS object representation of the DOM)
let rootDom = createDomNode(currentTree); // create the real DOM from the virtual DOM
app.appendChild(rootDom); // mount the real DOM to the app

document.getElementById("inc").addEventListener("click", () => { // increment the count
  count = count + 1;
  updateApp();
});

document.getElementById("dec").addEventListener("click", () => { // decrement the count
  count = count - 1;
  updateApp();
});

function updateApp() { // Here happens all the magic. We compare old and new virtual DOMs and only update the parts that were changed.
  const newTree = render(); // new virtual DOM (JS object representation of the DOM)
  
  const oldText = currentTree.props.children[0].props.children; // old text content of the first child
  const newText = newTree.props.children[0].props.children; // new text content of the first child

  if (oldText !== newText) { // if the text content is different, update the text content of the first child
    rootDom.children[0].textContent = newText; // update the text content of the first child in the real DOM
  }

  currentTree = newTree;
}