1 - We have built a decent approach in lesson 5 

2 - But the problem is that variables that we pass to function components, for example 'count' here, is global:

    let count = 0;

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

3 - Now let's imagine a situation, that we have two Title elements on the page and each should have its own different name and count. We would have to create two global variables:

    let name1 = "Apple"
    let name2 = "Bananas"
    let count1 = 0;
    let count2 = 2;

        function render() { // We combined the components in render() function
          return {
            type: "div",
            props: {
              children: [
                Title(name1, count1),
                Title(name2, count2),
                Controls()
              ]
            }
          };
        }

4 - This solution works but it's not scalable. What if we have 30 of Title elements and each needs its own 'count' variable? What if we have a different element 'Form' and other developer also uses count1 and count2 (but Form and Title need different values). Having global variables will be error prone in a big app. So, ideally, we need to figure out a way for each function component to hold its own state and remember it throug re-runs (re-renders)

5 - How can we solve this problem? We can try to create an array that will persist and hold values that are used in the function. 
