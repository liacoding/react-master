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