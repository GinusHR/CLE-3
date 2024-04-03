window.addEventListener("load", init);

const dataUrl = '/CLE-3/webservice/index.php';
let infoField;

function init() {
    infoField = document.getElementById("museum-info");
    getData(dataUrl);
}


function getData(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(succesHandler)
        .catch(errorHandler);

}

function succesHandler(data) {
    for (const museum of data) {
        console.log('Bingus');
        const div = document.createElement('div');
        div.classList.add('museum-card');
        const title = document.createElement('h2');
        title.innerText = `${museum.name}`;
        const image = document.createElement('img');
        image.src = museum.img;
        const beschrijving = document.createElement('p');
        beschrijving.innerText = `${museum.description}`


        infoField.appendChild(div);
        div.appendChild(title);
        div.appendChild(image);
        div.appendChild(beschrijving);

    }
}


function errorHandler(error) {
    console.error(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.innerText = 'Er is helaas iets fout gegaan met de API, probeer het later opnieuw.';
    infoField.appendChild(errorMessage);
}