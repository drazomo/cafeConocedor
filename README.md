# Cafe Conoceder

Find Cafes near you! Next.js web app use to find cafe shops near you using foursquare api and some static cafes in Valencia, ES.

**Link to project:** https://cafe-conocedor.vercel.app/

![alt tag](./public/static/cafe_conocedor.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Next.js (w/srw), TypeScript
**APIs used:** Foursquare (library & snippets created), unsplash, airtable (library & snippets created)

RENDERING CAFES IN VALENCIA:

- fetchCafeterias
  I’ve created a library to fetch data from our foursquare api (caeterias_lib.ts). If there is an instance with no arguments the api will fetch data of our default value (Valencia lat. and long. and a limit of 6.) Results retrieved from our fsq_api will be parsed and the value returned for it will include data that is needed to be displayed as well as adding photos into that object from our unsplash api being picked by the objects’ indexes. The fetchCafeterias will be used for any users’ requests for cafes nearby.

The cards will be already pre rendered therefore the use of getStaticProps is needed to successfully be prebuilt.

Our homepage (index.tsx) has a props argument which is our props from getstatic props and will pass through our data into our card component.

RENDER CARDS BASED ON USER’S LOCATION:
Use of react context will be used to manage the state of our newly created coffee store data not from our static props and it will retrieve our latitude and longitude and list of six cafes from the users’ query location. Our array of cafes will be used for our dynamic page every time a user clicks on the card.

Based on our length of the retrieved array the cards will be rendered.

RENDER INDIVIDUAL DYNAMIC PAGE:

With the help of our contextApi we will filter the specific cafeteria based on our param id which then sets it in our hook cafeStore. The creation of handleCreateCafe store is intended to save it into our airtable database in case if the users decides to share the link and there is no context identified.

When context is not used to find the cafeteria, swr will be used to fetch our data and set our voting count.

The handUpVoteBtn click will handle a put request to airtable to update our upvote value.

## Optimizations

If the user did not open any of the cards but instead copy and pasted the link to the dynamic page and share it with someone it will render a 404 page due to it not going through our createCafeStore api and saving the information into our airtable. We could optimize this error if a user updates or initiates use-track-location we can also send all that data into our airtable.

Under favoriteCafeById.ts there is a constant records declared as an any type. This can be later optimized if the project is scaled and a team is involved.

## Lessons Learned:

👩‍💻 First Project to implement TypeScript.
✅ Use of Next Image component and defining it src under next.config.js.
✅ GetStaticProps to fetch items from apis at pre-build time.
✅ Organizing custom snippets and hooks in its own folder.
✅ Dynamic Page Routing: GetStaticPaths, the function of fallbacks, useRouter to
✅ Creating serverless functions. (under api folder in pages)
✅ ContextApi is extremely similar to react-redux and the first type using a statemanager with TypeScript.
✅ instead of chaining fetch. use async/await as a way to chunk / readability.
✅ res.ok => res.status(400)
✅ TypeScript: to ensure that it will always return a value use an !.
✅ If you want to provide a type in a useState ensure it with a generic.
✅ async/await should have their own function inside a useEffect.
✅ Vague api/server errors? check the network tab in your browser.

## Where to find more:

**Personal Website:** https://markrasavong.com/

**My Github Repository:** https://github.com/mark-rasavong?tab=repositories
