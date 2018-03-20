// Your code here!
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
let theKey;


function GetApiKey() {
    let querystring = '?requestKey';
    let newUrl = url+querystring;

    // Gör en AJAX request och visa resultatet
    let ajax = new XMLHttpRequest();
    ajax.open('get', newUrl);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            // AJAX lyckades, presentera svaret
            let json = JSON.parse(ajax.responseText);
            console.log(json);
            theKey = json.key;
            document.getElementById('OutputMessage').innerHTML = 'Din key är ' + theKey + ', bara så du vet ;)';
        }
        else if (ajax.status !== 200) {
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request.';
        }
    };
    ajax.send();
}

function AddData() {
    let querystring = '?op=insert&key=' + theKey + '&title=Första Boken&author=Mrs Andersson';
    let newUrl = url+querystring;

    // Gör en AJAX request och visa resultatet
    let ajax = new XMLHttpRequest();
    ajax.open('post', newUrl);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            // AJAX lyckades, presentera svaret
            let json = JSON.parse(ajax.responseText);
            console.log('AddData ' + json);
            document.getElementById('OutputMessage').innerHTML += ' ' + json.status;
            //document.getElementById('Booklist').innerHTML = 'Success';
        }
        else if (ajax.status !== 200) {
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request.';
        }
    };
    ajax.send();
    ViewData();
}

function ViewData() {
    let querystring = '?op=select&key=' + theKey;
    let newUrl = url+querystring;
    
    let ajax = new XMLHttpRequest();
    ajax.open('get', newUrl);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            // AJAX lyckades, presentera svaret
            let json = JSON.parse(ajax.responseText);
            console.log('ViewData ' + json[0].Object);
            document.getElementById('BooksAuthors').value = 'HejHej';
            document.getElementById('OutputMessage').innerHTML += ' ' + json;
            //document.getElementById('Booklist').innerHTML = 'Success';
        }
        else if (ajax.status !== 200) {
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request.';
        }
    };
    ajax.send();
}