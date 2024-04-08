window.addEventListener("load", init);

const dataUrl = 'CLE-3/webservice/index.php';
let infoField;
let museumData = {};
let dialog;
let dialogContent;
let dialogExit;

function init() {
    infoField = document.getElementById("museum-info");
    getData(dataUrl);
    infoField.addEventListener("click", clickHandler)
    dialog = document.getElementById('museum-detail');
    dialogContent = document.getElementById('modal-content');
    dialogExit = document.getElementById('modal-close');
    dialogExit.addEventListener('click', dialogCloseHandler);
    dialog.addEventListener('click', dialogOutsideHandler);
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
        const div = document.createElement('div');
        div.classList.add('museum-card');
        const title = document.createElement('h2');
        title.innerText = `${museum.name}`;
        const image = document.createElement('img');
        image.src = museum.img;
        image.alt = museum.alt;
        const beschrijving = document.createElement('p');
        beschrijving.innerText = `${museum.tag}`
        const button = document.createElement('button');
        button.innerText = 'Museum info';
        button.alt = 'knop die gaat naar de beschrijving van het bovenstaande museum'
        button.dataset.id = museum.id;


        infoField.appendChild(div);
        div.appendChild(title);
        div.appendChild(image);
        div.appendChild(beschrijving);
        div.appendChild(button);

        museumData[museum.id] = museum;
    }

}

function clickHandler(e) {

    if (e.target.nodeName !== "BUTTON") {
        return;
    }
    console.log("Bingus");
    let museum = museumData[e.target.dataset.id];
    console.log(museum);
    dialog.showModal();
    dialogContent.innerHTML = '';
    let title = document.createElement('h1');
    title.innerText = `${museum.name}`;
    dialogContent.appendChild(title);
    let image = document.createElement('img');
    image.src = museum.img ;
    dialogContent.appendChild(image);
    let description = document.createElement('div');
    description.innerText = `${museum.description}`
    dialogContent.appendChild(description)


}

function dialogCloseHandler() {
    dialog.close();
}

function dialogOutsideHandler(e) {
    if(e.target === dialog) {
        dialog.close();
    }
}

function errorHandler(error) {
    console.error(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.innerText = 'Er is helaas iets fout gegaan met de API, probeer het later opnieuw.';
    infoField.appendChild(errorMessage);
}