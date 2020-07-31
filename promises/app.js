const website = document.querySelector("#website");

const posts = [
    {title: "Title #1", body: "Post body #1"}, 
    {title: "Title #2", body: "Post body #2"}
];

function getPosts() {
    let output = "";
    for(const post of posts) {
        output += `<li>${post.title}: ${post.body}</li>`
    }
    website.innerHTML = output;
}

function creatPost(title, body) {
    posts.push({title, body});
}

getPosts();