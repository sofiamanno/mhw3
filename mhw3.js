function onResponse(response) {
    return response.json();
  }
  
  function onJson(json) {
    console.log(json);
    const ris_ricerca = document.querySelector("#ris_ricerca");
    ris_ricerca.innerHTML = "";
    

    const h = document.createElement("h1");
    h.textContent = "Film trovati";
    ris_ricerca.appendChild(h);
    for (let i = 0; i < 10; i++) {
      const film = json.Search[i];
      const title = film.Title;
      const year = film.Year;
      const poster = film.Poster;
      const f = document.createElement("div");
      f.classList.add("film");
      const img = document.createElement("img");
      img.src = poster;
      const caption = document.createElement("span");
      caption.textContent = "Titolo: " + title + " - Anno uscita: " + year;
      f.appendChild(img);
      f.appendChild(caption);
      ris_ricerca.appendChild(f);
    }
  }

  function onJson_a(json) {
    console.log(json);
    const ris_ricerca_album = document.querySelector("#ris_ricerca_album");
    ris_ricerca_album.innerHTML = "";
    

    const h = document.createElement("h1");
    h.textContent = "Album trovati";
    ris_ricerca_album.appendChild(h);
    const results = json.albums.items;
    for (let i = 0; i < 10; i++) {
      if (results[i].album_type === "album") {
        const album_data = results[i];
        const name = album_data.name;
        const release_date = album_data.release_date;
        const total_tracks = album_data.total_tracks;
        const image_url = album_data.images[0].url;
        const album = document.createElement("div");
        album.classList.add("album");
        const img = document.createElement("img");
        img.src = image_url;
        const caption = document.createElement("span");
        caption.textContent =
          "Titolo: " +
          name +
          " - Data uscita: " +
          release_date +
          " - Num. Tracce: " +
          total_tracks;
  
        album.appendChild(img);
        album.appendChild(caption);
        ris_ricerca_album.appendChild(album);
      }
    }
  }

function search_f(event) {
  event.preventDefault(); 
  
  const film_input = document.querySelector("#film");
  const film_value = encodeURIComponent(film_input.value);
  rest_url = "http://www.omdbapi.com/?i=tt3896198&apikey=7e609ec7&s=" + film_value;
  
  fetch(rest_url).then(onResponse).then(onJson);
}

function onTokenJson(json) {
    token_data = json;
  }
  
  function onTokenResponse(response) {
    return response.json();
  }

  function search_a(event) {
    event.preventDefault(); 
    
    const film_input_album = document.querySelector("#input_album");
    const film_album_value = encodeURIComponent(film_input_album.value);
    
    fetch("https://api.spotify.com/v1/search?type=album&q=" + film_album_value, {
      headers: {
        Authorization: "Bearer " + token_data.access_token,
      },
    })
      .then(onResponse)
      .then(onJson_a);
  }
  
  let token_data;
  const client_id = "f12943d6f515452188c81b456852858d";
  const client_secret = "b609104e874a421e8d8b7099ae37d0ce";
  fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
  })
    .then(onTokenResponse)
    .then(onTokenJson);
  
  
  
  const form_f = document.querySelector("#films");
  form_f.addEventListener("submit", search_f);
  
  const form_a = document.querySelector("#form_album");
  form_a.addEventListener("submit", search_a);
  