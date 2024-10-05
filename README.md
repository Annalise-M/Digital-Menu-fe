# Digital-Menu-fe

As of 10.04.2024
Updated depreciated node modules and did a :
  npm install webpack-dev-server@4.14.0 --save --save-exact --save-dev
  to keep the dependencies from breaking beyond the 4.14 versioning (it seemed to break into the ^4.15)

  Also updated the createStore call in store.js to legacy_creatStore from redux.

Notes:  
=> Things to work on:  
    Code clean up and Nav clarity
    ie.  
    |_Pulic View => Home ( All time user viewpoint )
      |_Home.jsx => All rendered card content needs to be visible and seen here by everyone.
    |_Public View has access to credential user login for private owner & || workers in the restaurant to be able to adjust the menu IRL

  =>  Look into injecting the GSAP plugin's (look at MenuList.jsx & BeerList.jsx) here to get the rendering per card => check on the placement of the container element and see how & where that lands  

  Things to consider:
    Observations: It looks like I got caught/ stuck in over thinking a specific design element & function to where I began to over think the layout and became clumbsy in my current designs.

    Contemplations: Thinking about coming at this design as if it wasn't my own. If this were someone else's app that needed improvement, what would I do? What would that look like?  
      
