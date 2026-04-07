1 - Right now updating state and updating UI are done by two separate functions: 

setState() - updating value
updateApp() - updating UI to show new value on the page 

For example: here 

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
              updateApp();
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
              updateApp();
            }
          }
        }
      ]
    }
  };
}


2 - It's not the best solution because we still handling updating UI manually. What if a developer forgets to write an updateApp() function after updating a state? We need to make sure we avoid this 100% otherwise we still have an error-prone application. Our goal is to bug-proof an app as much as we can! 

3 - How we can do that?

4 - The first answer is to put updateApp() function inside setState(). For that, we can pass additional parameter to useState() (setState() is inside useState() function)

Like this:

export function useState(initialValue, updateApp) {
  const currentIndex = hookIndex; // - Get the current index of the state in the array.

  if (stateStore[currentIndex] === undefined) { // - If the state at the current index is undefined, set it to the initial value.
    stateStore[currentIndex] = initialValue;
  }

  function setState(newValue) {
    stateStore[currentIndex] = newValue; // - Set the new value to the state at the current index.
    updateApp(); // - Call the updateApp function to update the UI. (so it will automatically rerender the UI after setting the new value)
  }

  const value = stateStore[currentIndex]; // - Get the current value of the state from the array.

  hookIndex++; // - Increment the index to the next state in the array.

  return [value, setState]; // - Return the current value of the state and the function to set the new value.

}


And then we need to pass an argument updateApp when we call useState() in index.js 

function render() { // We combined the components in render() function
  resetHookIndex();
  const [nameOfApples] = useState("Apples", updateApp); <- PASSED ARGUMENT HERE 
  const [nameOfBananas] = useState("Bananas", updateApp); <- PASSED ARGUMENT HERE 
  [countOfApples, setCountOfApples] = useState(0, updateApp); <- PASSED ARGUMENT HERE 
  [countOfBananas, setCountOfBananas] = useState(0, updateApp); <- PASSED ARGUMENT HERE 

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

Now, we can remove updateApp() after setting states 

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

GOAL: make automatic re-renders (changing UI) after changing state (value on UI page)