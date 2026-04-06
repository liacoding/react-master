Now, let's think how we can solve this problem using JS.

1) What we usually do in order to solve a problem of repetitive steps, for example when we manually control DOM and have to update each element holding the same state? Functions! 

2) Using functions, we also will avoid dependency on HTML. It makes our code more stable and less error prone. 

3) The idea is simple. We can insert HTML using JS. So we can just create all HTML we need, using a function and call it again whenever we update something. 

GOAL: to implement render() function, make updates of the UI automatic if state (variable on the UI page) changes. 