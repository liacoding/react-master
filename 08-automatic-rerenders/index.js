import { useState, resetHookIndex } from "./useState.js";

let setCountOfApples;
let setCountOfBananas;
let countOfApples;
let countOfBananas;

const app = document.getElementById("app");

function Title(name, value) { // We separated the title element to its own function component 
  return {
    type: "h1",
    props: {
      children: `${name}: ${value}`
    }
  };
}

function Controls() {
  return {
    type: "div",
    props: {
      children: [
        {
          type: "button",
          props: {
            children: "+",
            onClick: () => { // We add the event handler to the button
              setCountOfApples(countOfApples + 1);
              setCountOfBananas(countOfBananas + 1);
              // we removed the updateApp() function here because it will be called automatically by the useState function
            }
          }
        },
        {
          type: "button",
          props: {
            children: "-",
            onClick: () => { // We add the event handler to the button
              setCountOfApples(countOfApples - 1);
              setCountOfBananas(countOfBananas - 1);
              // we removed the updateApp() function here because it will be called automatically by the useState function
            }
          }
        }
      ]
    }
  };
}

function render() { // We combined the components in render() function
  resetHookIndex();
  const [nameOfApples] = useState("Apples", updateApp);
  const [nameOfBananas] = useState("Bananas", updateApp);
  [countOfApples, setCountOfApples] = useState(0, updateApp);
  [countOfBananas, setCountOfBananas] = useState(0, updateApp);

  return {
    type: "div",
    props: {
      children: [
        Title(nameOfApples, countOfApples),
        Title(nameOfBananas, countOfBananas),
        Controls()
      ]
    }
  };
}

 
function createRealDom(virtualDom) {
  const realDom = document.createElement(virtualDom.type);
  const props = virtualDom.props || {}; 

  for (const key in props) { // We iterate over the props object 
    const value = props[key];

    if (key === "children") continue;

    // Event handlers - if the key starts with "on" and the value is a function, we add the event listener to the real DOM element
    if (key.startsWith("on") && typeof value === "function") { 
      const eventName = key.slice(2).toLowerCase();
      realDom.addEventListener(eventName, value);
      continue;
    }

    // Normal props
    realDom[key] = value;
  }

  const children = props.children;

  if (typeof children === "string") {
    realDom.textContent = children;
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      realDom.appendChild(createRealDom(child));
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

// Now we don't need to manually attach event listeners to the buttons, because we have the event handlers in the Controls function component
// document.getElementById("inc").addEventListener("click", () => { // increment the count
//   setCountOfApples(countOfApples + 1);
//   setCountOfBananas(countOfBananas + 1);
//   updateApp();
// });

// document.getElementById("dec").addEventListener("click", () => { // decrement the count
//   setCountOfApples(countOfApples - 1);
//   setCountOfBananas(countOfBananas - 1);
//   updateApp();
// });

// Now in the updateApp function, we combine diff and commit functions
function updateApp() {
  const newVirtualDom = render();

  const operations = diff(currentVirtualDom, newVirtualDom, realDom);

  commit(operations);

  currentVirtualDom = newVirtualDom;
}