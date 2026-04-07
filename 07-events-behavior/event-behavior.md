1 - In this lesson, let's unite UI objects (that are represented as JS objects) with its behavior 

2 - If we don't do it, we will have to manually attach event listeners to every element, for example button. If we have 10 buttons with different events handlers, we will have to manually attach 10 event handlers 

3 - For example this function component: 

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

Now it has only UI description of the element. But we can attach event handlers and other behavior logic as well 

GOAL: Attach event behavior to the UI objects 