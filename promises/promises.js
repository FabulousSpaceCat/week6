// We're going to set it up like Harcourt did, theoretically
// I'm trying to remember instead of looking at his repo

// So set a variable to the document selector we're looking for
const website = document.querySelector("#website");

// Make the array and preload it with a couple of posts
const posts = [
    {title: "Title #1", body: "Post body #1"}, 
    {title: "Title #2", body: "Post body #2"}
];

// Get the posts, but make it take a second
function getPosts() {
    setTimeout(() => {
        let output = "";
        for(const post of posts) {
            output += `<li>${post.title}: ${post.body}</li>`
        }
        website.innerHTML = output;
    }, 1000);
}

// Function to make a new post that takes a couple of seconds
// I'm not actually sure how we'd get an error condition here except to force one with a variable
// Which is what Harcourt did, and if we use it then it HAS to be defined
// Maybe some further thought into a function that can fail here
function newPost(title, body) {
    return new Promise((yes, no) => {
        setTimeout(() => {
            err = false;
            posts.push({title, body});
            if (err) {
                no(`What?`);
            } 
            else {
                yes();
            }
        }, 2000);
    });
}

// Use the function to make a new post
// Interesting that it moves the `What?` into the err in the catch and then it's referenced later
newPost("Title #3", "Post body #3")
    .then(() => {
        getPosts();
        console.log("Ding!")
    })
    .catch((err) => {
        website.innerHTML = err;
    });

// We can also try an async/await version
// And see if it'll wait on BOTH posts
async function alsoNewPost() {
    await newPost("Title #4", "Post body #4");
    await newPost("Title #5", "Post body #5");
    console.log("Clonk.")
    getPosts();
}

// Can an async function await many conditions?  We're about to find out.
alsoNewPost();

// Well that's an interesting behavior!  When I used async/await, it listed 4, then waited two seconds and listed 5!
// I could guess that this is because we don't await getPosts, and because they're awaiting in order
// Is this the same behavior as promise.all?

// So make some new posts
const promise6 = newPost("Title #6", "Post body #6");
const promise7 = newPost("Title #7", "Post body #7");
// And promise them together
Promise.all([promise6, promise7]) // They just go in an array, same notation after as before
    .then(() => {
        getPosts();
        console.log("Ding ding!")
    })
    .catch((err) => {
        website.innerHTML = err;
    });

// Arrow notation is nice btw

// So the async function dropped post #5 in there at the end
// This was not unexpected, but we probably don't want to mix async and .then() like that
// Unless we're going for that effect
// Should probably watch some videos on both

// I left it there on purpose to ask questions about