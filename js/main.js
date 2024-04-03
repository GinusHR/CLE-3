window.addEventListener("load", init);

const dataUrl = '/webservice/index.php';
let infoField;

function init() {
    infoField.getElementById('museum-info');
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
        const div = document.createElement('div');
        const title = document.createElement('h2');
        title.innerText = `${museum.name}`;
        infoField.appendChild(div);
        div.appendChild(title);
    }
}


function errorHandler() {

}