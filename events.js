let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let cat = searchParams.get("cat");

if (id) {
    getSingleEvent(id);
} else if(cat == "movies") {
    getAllMovies();
} else if(cat == "others"){
    getAllOthers();
}

function getAllMovies() {
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/programmes?_embed")
        .then(res => res.json())
        .then(showAllMovies)
}


function showAllMovies(data) {
    let template = document.querySelector("#list-template").content;
    let listParent = document.querySelector(".append-list");
    document.querySelector("#events-header-two p").textContent = "Movies"

    data.forEach(function (theEvent) {
        let clone = template.cloneNode(true);

        appendItems(theEvent, clone)

        if (theEvent.acf.category[0] === "Movie") {
        listParent.appendChild(clone);
    }

  })
}

function getAllOthers() {
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/programmes?_embed")
        .then(res => res.json())
        .then(showAllOthers)
}

function showAllOthers(data) {
    let template = document.querySelector("#list-template").content;
    let listParent = document.querySelector(".append-list");
    document.querySelector("#events-header-two p").textContent = "Others"

    data.forEach(function (theEvent) {
        let clone = template.cloneNode(true);
        let category = clone.querySelector('h2');

        category.textContent = theEvent.acf.category[0];


        appendItems(theEvent, clone)


        if (theEvent.acf.category[0] !== "Movie") {
        listParent.appendChild(clone);
    }
    })
}


function appendItems(theEvent, clone){
    let title = clone.querySelector('h1');
    let genre = clone.querySelector('h3');
    let price = clone.querySelector('.price');
    let description = clone.querySelector('.description');
    let img = clone.querySelector('img');
    let link = clone.querySelector('a.link');

    title.textContent = theEvent.title.rendered;
    genre.textContent = theEvent.acf.genre;
    description.innerHTML = theEvent.excerpt.rendered;
    img.setAttribute('src', theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    link.setAttribute('href', "singleEvent.html?id=" + theEvent.id);

}


function getSingleEvent(myId) {
    fetch("http://youhys.dk/wordpress/wp-json/wp/v2/programmes/" + myId + "?_embed")
        .then(res => res.json())
        .then(showSingleEvent);
}

function showSingleEvent(json) {

    console.log(json);

    document.querySelector('#single-event h1').textContent = json.title.rendered;
    document.querySelector('#single-event img').setAttribute('src', json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector("#single-event #genre-span").textContent = json.acf.genre;
    document.querySelector("#single-event .description").innerHTML = json.content.rendered;
    document.querySelector("#single-event #price-span").textContent = json.acf.price;
    document.querySelector("#single-event #venu-span").textContent = json.acf.location;
    document.querySelector("#single-event #starting-span").textContent = json.acf.starts_at;
    document.querySelector("#single-event #door-opens-span").textContent = json.acf.door_opens_at;
    document.querySelector("#single-event #cat-span").textContent = json.acf.category[0];

    //setting the back icon link depending on which event you are viewing
    let link = document.querySelector('a.back-link');

    if(json.acf.category[0]=="Movie"){
        link.setAttribute('href', "lists.html?cat=movies");
        document.querySelector("#events-header-two p").textContent = "Movie"
       }else{
        link.setAttribute('href', "lists.html?cat=others");
        document.querySelector("#events-header-two p").textContent = "Other"
       }

}
