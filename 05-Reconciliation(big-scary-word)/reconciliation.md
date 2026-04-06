1 Reconciliation? What the heck is that?? Big scary word that means one simple thing: we compare old virtual DOM with new virtual DOM and then update real DOM to make it be in agreement with the new virtual DOM

2 So many words. Virtual DOM, as we remember, is just JS object that represents real DOM (real HTML). And we use JS objects because it's much easier to compare them rather than two HTML versions. 

3 So reconciliation consists of: 

Comparing 2 JS objects that represent DOM 
If there are any changes -> Update DOM 

4 Right now in our code, function named updateApp() executes reconciliation: 

      function updateApp() { 
        const newTree = render(); // new virtual DOM (JS object representation of the DOM)
        
        const oldText = currentTree.props.children[0].props.children; // old text content of the first child
        const newText = newTree.props.children[0].props.children; // new text content of the first child

        if (oldText !== newText) { // if the text content is different, update the text content of the first child
          rootDom.children[0].textContent = newText; // update the text content of the first child in the real DOM
        }

        currentTree = newTree;
      }


5 But notice, that we MUST know exactly where a change will happen - in Title part (rootDom.children[0].textContent = newText;). It works only if: 
- the title is always children[0]
- the text is always inside props.children
- the changed part is always the first child

 But what if we have many different elements that will need to be updated? We need a more flexible solution! 

GOAL: to create a flexible solution for comparing virtual DOMs and updating real DOM 

In React, the action of comparing old and new virtual DOMs is called diffing (from the word 'difference')
And the action of updating new DOM - commit (means to send/to put something somewhere, in our case: we put updates to real DOM)