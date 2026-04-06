// Manually controlling the DOM (HTML) is not convenient for the following reasons:

// 1. App logic depends on HTML structure, but it should be the other way around.
// Example: if we change <div id="count">0</div> to <div class="count">Count: 0</div>,
// our JS breaks because it relies on specific DOM structure.

// 2. State and UI logic are mixed together, making code harder to read and maintain.

// 3. We must manually synchronize state and DOM.
// If multiple elements depend on the same state, we must update each one manually.

// Example: if 10 elements depend on "count", we must update all 10 manually.
// This becomes error-prone and hard to scale.

// Try to observe these problems in the code in this folder.