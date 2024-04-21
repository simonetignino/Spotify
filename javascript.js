//Selezioni tutte le row dove mostrerò il contenuto di default
const artistiPresenti = document.querySelectorAll('.mostrarisultati');

function search(){
    
    //Prendo il valore 
    const input = document.getElementById('searchField').value;

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
        //trasformo il risutat in json
        .then(response => response.json())
        .then(data => {
            // Estraggo i dati necessari dal JSON
            const canzoni = data.data;
            const container = document.getElementById('searchSection');
            canzoni.forEach(canzone => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${canzone.album.cover}" alt="${canzone.title}">
                <h3>${canzone.title}</h3>
                <p>${canzone.artist.name}</p>
                <p>${canzone.album.title}</p>
                `;
            container.appendChild(card);
            document.getElementById('found').classList.remove('d-none');
            });
        });
    
    artistiPresenti.forEach(artista => {
      //Estraggo da ogni risultato mi estraggo l'id dato che equivale al nome dell'artista
       let nomeArtista= artista.id;
       document.getElementById(nomeArtista).classList.add('d-none');
    });  
}

//Elaboro gli elementi che ho ottenuto
artistiPresenti.forEach(artista => {
    
    //Estraggo da ogni risultato mi estraggo l'id dato che equivale al nome dell'artista
     let nomeArtista= artista.id;
     
     //Inietto il nome dell'artista 
     fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${nomeArtista}`)
     
     //trasformo il risutati in oggetto
     .then(response => response.json())

      //Do un nome all'oggetto chiamandolo 'braniOttenuti' e lo elaboro
     .then(braniOttenuti => {

        //Dall'oggetto braniOttenuti prendo i "data"
        let canzoni = braniOttenuti.data;

        //Prendo il nome nomeArtista+'Section' e lo unisco ottenendo il nome dell'id
        let container = document.getElementById(nomeArtista+'Section');
        canzoni.forEach(canzone => {

          //Per ogni card elaboro il contenuto
          let card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${canzone.album.cover}" alt="${canzone.title}">
            <h3>${canzone.title}</h3>
            <p>${canzone.artist.name}</p>
            <p>${canzone.album.title}</p>
            `;
          container.appendChild(card);
          document.getElementById(nomeArtista).classList.remove('d-none');
        });
      })
});

