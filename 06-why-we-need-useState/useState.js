let stateStore = []; // - Array that will persist and hold values that are used in the function.
let hookIndex = 0; // - Index that will be used to track the current index of the state in the array. 

export function resetHookIndex() {
  hookIndex = 0; // - Reset the index to 0 when the function is called again.
}

export function useState(initialValue) {
  const currentIndex = hookIndex; // - Get the current index of the state in the array.

  if (stateStore[currentIndex] === undefined) { // - If the state at the current index is undefined, set it to the initial value.
    stateStore[currentIndex] = initialValue;
  }

  function setState(newValue) {
    stateStore[currentIndex] = newValue; // - Set the new value to the state at the current index.
  }

  const value = stateStore[currentIndex]; // - Get the current value of the state from the array.

  hookIndex++; // - Increment the index to the next state in the array.

  return [value, setState]; // - Return the current value of the state and the function to set the new value.

}

// In basic words, we store values in the array. All the other things we need in order to manage the array successfully:

// - Seed the array with initial values
// - Track what value from array we need to use using indexes
// - Return the value from the array using the right index