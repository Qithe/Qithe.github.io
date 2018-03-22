var url = '§';
var btn_NewApikey = document.getElementsByName('NewApiKey');
var ApiOutput = document.getElementById('CurrentApiKey');
var get = '?requestKey';

function getAPIKey() {
    //Get the api key
    var ajax = new XMLHttpRequest();
    ajax.open('get', url + get);
    ajax.onreadystatechange = function () {
       if (ajax.status === 200 && ajax.readyState === 4) {
           // AJAX lyckades, presentera svaret
           var json = JSON.parse(ajax.responseText);
           console.log(json);
           var theKey = json.key;
           
           document.getElementById('CurrentApiKey').value += 'Din key är ' + theKey + ', bara så du vet ;)';
       }
       else if (ajax.status !== 200) {
        document.getElementById('CurrentApiKey').value = 'Ett okänt fel inträffade vid AJAX request.';
       }
   };
   ajax.send();
}

function getBooks() {
    //Get books
}

function addBook() {
    console.log('it works')
}











 