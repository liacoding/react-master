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

// In diff function, we will compare and decide what operations need to be done if there were any changes 
// In commit function, we will apply the operations to the real DOM
function diff(oldVirtualDom, newVirtualDom, realDom, operations = []) { 
  // 1. Replace whole node if type changed, operation: REPLACE 
  if (oldVirtualDom.type !== newVirtualDom.type) {
    operations.push({
      type: "REPLACE",
      oldRealDom: realDom,
      newVirtualDom
    });

    return operations;
  }

  // 2. Update text if both children are strings, operation: TEXT
  if (
    typeof oldVirtualDom.props.children === "string" &&
    typeof newVirtualDom.props.children === "string"
  ) {
    if (oldVirtualDom.props.children !== newVirtualDom.props.children) {
      operations.push({
        type: "TEXT",
        realDom,
        value: newVirtualDom.props.children
      });
    }

    return operations;
  }

  // 3. Compare child arrays, operation: ADD, REMOVE
  const oldChildren = Array.isArray(oldVirtualDom.props.children)
    ? oldVirtualDom.props.children
    : [];

  const newChildren = Array.isArray(newVirtualDom.props.children)
    ? newVirtualDom.props.children
    : [];

  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];
    const childRealDom = realDom.childNodes[i];

    // Add
    if (!oldChild && newChild) {
      operations.push({
        type: "ADD",
        parentRealDom: realDom,
        newVirtualDom: newChild
      });
      continue;
    }

    // Remove
    if (oldChild && !newChild) {
      operations.push({
        type: "REMOVE",
        realDom: childRealDom
      });
      continue;
    }

    // Recurse
    if (oldChild && newChild) {
      diff(oldChild, newChild, childRealDom, operations);
    }
  }

  return operations;
}

// In commit function, we apply the operations to the real DOM
function commit(operations) {
  operations.forEach((operation) => {
    if (operation.type === "TEXT") {
      operation.realDom.textContent = operation.value;
    }

    if (operation.type === "REPLACE") {
      const newRealDom = createRealDom(operation.newVirtualDom);
      operation.oldRealDom.replaceWith(newRealDom);
    }

    if (operation.type === "ADD") {
      const newRealDom = createRealDom(operation.newVirtualDom);
      operation.parentRealDom.appendChild(newRealDom);
    }

    if (operation.type === "REMOVE") {
      operation.realDom.remove();
    }
  });
}

let currentVirtualDom = render(); // initial virtual DOM (JS object representation of the DOM)
let realDom = createRealDom(currentVirtualDom); // create the real DOM from the virtual DOM
app.appendChild(realDom); // mount the real DOM to the app

document.getElementById("inc").addEventListener("click", () => { // increment the count
  count = count + 1;
  updateApp();
});

document.getElementById("dec").addEventListener("click", () => { // decrement the count
  count = count - 1;
  updateApp();
});

// Now in the updateApp function, we combine diff and commit functions
function updateApp() {
  const newVirtualDom = render();

  const operations = diff(currentVirtualDom, newVirtualDom, realDom);

  commit(operations);

  currentVirtualDom = newVirtualDom;
}