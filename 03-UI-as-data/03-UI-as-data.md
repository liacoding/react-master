1 In the previous lesson, we implemented render() function to make updates easier and more managable. But with that approach, we have to recreate the whole DOM tree every time we make even a very small change. It would be great to be able to update only those parts of the UI that actually changed without unnecessary full DOM rebuild. 

2 Let's think how we can achieve that. Ideally, we should be able to compare old and new versions of the UI and then change only parts that were updated. 

3 Now, how we can do that comparison? Objects would be very convenient, if comparing them to strings. We also can update object's properties very easily. 

4 So, we can have versions of DOM as JS objects -> Compare old one with new one and only if some parts were changes, update those parts in real DOM. 

