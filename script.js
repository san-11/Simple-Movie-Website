// DUMMY names
var names = {
    1: {
        name: "Red Notice",
        desc: "An Interpol agent tracks the world's most wanted art thief.",
        img: "rn.jpg",
    },
    2: {
        name: "Antim: The Final Truth",
        desc: "The cop played by Salman fights the land mafia in the film. ",
        img: "4.jpg",
    },
    3: {
        name: " The Silence of the Lambs ",
        desc: "Six people unwillingly find themselves locked in another series of escape rooms, slowly uncovering what they have in common to survive..",
        img: "esc.jpg",
    },
    4: {
        name: "Dune",
        desc: "the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        img: "dune.jpg",
    },
    5: {
        name: "Dhamaka",
        desc: "Reassigned from TV to radio, a frustrated anchor sees both danger and opportunity when he receives threatening calls on the air. ",
        img: "5.jpg",

    },
    6: {
        name: " The Shawshank Redemption (1994)",
        desc: " He becomes the most unconventional prisoner.",
        img: "6.jpg",

    },
    7: {
        name: " The Godfather (1972)",
        desc: " The Godfather (1972) ",
        img: "7.jpg",

    },
    8: {
        name: "Star Wars: ",
        desc: "Star Wars: ",
        img: "8.jpg",

    },
    9: {
        name: " Terminator 2: Judgment Day ",
        desc: " Terminator 2: Judgment Day ",
        img: "9.jpg",

    },
    10: {
        name: " 3 Idiots ",
        desc: " 3 Idiots ",
        img: "10.jpg",

    },
    11: {
        name: " Toy Story",
        desc: " Toy Story",
        img: "11.jpg",

    },
    12: {
        name: "Star Wars: ",
        desc: "Star Wars: ",
        img: "12.jpg",

    },
    13: {
        name: " Dangal",
        desc: " Dangal",
        img: "13.jpg",

    },
    14: {
        name: " Jai Bhim (2021)",
        desc: " Jai Bhim (2021)",
        img: "14.jpg",

    },

};


var movie = {
    // (A) PROPERTIES
    hPdt: null, // HTML names list
    hItems: null, // HTML current movie
    items: {}, // Current items in movie

    // (B) LOCALSTORAGE movie
    // (B1) SAVE CURRENT movie INTO LOCALSTORAGE
    save: function() {
        localStorage.setItem("movie", JSON.stringify(movie.items));
    },

    // (B2) LOAD movie FROM LOCALSTORAGE
    load: function() {
        movie.items = localStorage.getItem("movie");
        if (movie.items == null) { movie.items = {}; } else { movie.items = JSON.parse(movie.items); }
    },

    // (B3) EMPTY ENTIRE movie
    nuke: function() {
        if (confirm("Empty favourite List?")) {
            movie.items = {};
            localStorage.removeItem("movie");
            movie.list();
        }
    },

    // (C) INITIALIZE
    init: function() {
        // (C1) GET HTML ELEMENTS
        movie.hPdt = document.getElementById("movie-names");
        movie.hItems = document.getElementById("movie-items");

        // (C2) DRAW names LIST
        movie.hPdt.innerHTML = "";
        let p, item, part;
        for (let id in names) {
            // WRAPPER
            p = names[id];
            item = document.createElement("div");
            item.className = "p-item";
            movie.hPdt.appendChild(item);

            // movie IMAGE
            part = document.createElement("img");
            part.src = "img/" + p.img;
            part.className = "p-img";
            item.appendChild(part);

            // movie NAME
            part = document.createElement("div");
            part.innerHTML = p.name;
            part.className = "p-name";
            item.appendChild(part);

            // movie DESCRIPTION
            part = document.createElement("div");
            part.innerHTML = p.desc;
            part.className = "p-desc";
            item.appendChild(part);

            // ADD TO fav
            part = document.createElement("input");
            part.type = "button";
            part.value = "Add to Favorites";
            part.className = "movie p-add";
            part.onclick = movie.add;
            part.dataset.id = id;
            item.appendChild(part);
        }

        // (C3) LOAD movie FROM PREVIOUS SESSION
        movie.load();

        // (C4) LIST CURRENT movie 
        movie.list();
    },

    // (D) LIST CURRENT movie ITEMS (IN HTML)
    list: function() {
        // (D1) RESET
        movie.hItems.innerHTML = "";
        let item, part, pdt;
        let empty = true;
        for (let key in movie.items) {
            if (movie.items.hasOwnProperty(key)) { empty = false; break; }
        }

        // (D2) List IS EMPTY
        if (empty) {
            item = document.createElement("div");
            item.innerHTML = "List is empty";
            movie.hItems.appendChild(item);
        } else {
            let p, total = 0,
                subtotal = 0;
            for (let id in movie.items) {
                // ITEM
                p = names[id];
                item = document.createElement("div");
                item.className = "c-item";
                movie.hItems.appendChild(item);

                // NAME
                part = document.createElement("div");
                part.innerHTML = p.name;
                part.className = "c-name";
                item.appendChild(part);

                // REMOVE
                part = document.createElement("input");
                part.type = "button";
                part.value = "X";
                part.dataset.id = id;
                part.className = "c-del movie";
                part.addEventListener("click", movie.remove);
                item.appendChild(part);

            }

            // EMPTY BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Remove all from Favorites";
            item.addEventListener("click", movie.nuke);
            item.className = "c-empty movie";
            movie.hItems.appendChild(item);

        }
    },

    // (E) ADD ITEM INTO movie
    add: function() {
        if (movie.items[this.dataset.id] == undefined) {
            movie.items[this.dataset.id] = 1;
        } else {
            movie.items[this.dataset.id]++;
        }
        movie.save();
        movie.list();
    },

    // (G) REMOVE ITEM FROM movie
    remove: function() {
        delete movie.items[this.dataset.id];
        movie.save();
        movie.list();
    },

};
window.addEventListener("DOMContentLoaded", movie.init);