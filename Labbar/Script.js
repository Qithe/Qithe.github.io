// Your code here!
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
let theKey;

function wait(ms) {
    var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

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
    let title = document.getElementById('Title').value;
    let author = document.getElementById('Author').value;
    var PushSuccessful = false;
    var tries = 0;
    
    if(title!=='' && author!==''){
        while(!PushSuccessful || tries>=9){
            var statusMessage = PushToDatabase(title,author); 
            if (statusMessage == 'success'){
                PushSuccessful = true;
            } else {
                tries++;
                console.log('Try nr'+tries+1);
                if(tries>=9){
                    console.log('Push unsuccsssesful')
                    document.getElementById('OutputMessage').innerHTML = 'Något gick fel, var god görsök igen';
                }
            }
        }
        document.getElementById('Title').value='';
        document.getElementById('Author').value='';
    }
    else{
        document.getElementById('OutputMessage').innerHTML = 'Du måste fylla i både en titel och författare';
        console.log('Författare och/eller titel saknades i sina text fält');
    }
}
 
function PushToDatabase(title, author){
    var statusMessage = '';
    let querystring = '?op=insert&key=' + theKey + '&title='+title+'&author='+author;
    let newUrl = url+querystring;
    // Gör en AJAX request och visa resultatet
    let ajax = new XMLHttpRequest();
    ajax.open('post', newUrl);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            // AJAX lyckades, presentera svaret
            let json = JSON.parse(ajax.responseText);
            console.log('AddData was: ' + json.status);
            statusMessage = json.status;
            document.getElementById('OutputMessage').innerHTML += ' ' + json.status;
            //document.getElementById('Booklist').innerHTML = 'Success';
        }
        else if (ajax.status !== 200) {
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request.';
        }
    };
    ajax.send();
    return statusMessage;
}

function ViewData() {
    let querystring = '?op=select&key=' + theKey;
    let newUrl = url+querystring;
    var x = "",i;
    
    let ajax = new XMLHttpRequest();
    ajax.open('get', newUrl);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            // AJAX lyckades, presentera svaret
            //Tar JSON(responsetext) och gör den till json(json)
            let json = JSON.parse(ajax.responseText); 
            //Ta ut arrayen ur json
            for (i in json.data) {
                x += "<option>"+ json.data[i].title + ", " + json.data[i].author +"</option>";
                console.log(x);
            }
            document.getElementById('BooksAuthors').innerHTML += x;
            
            
        }
        else if (ajax.status !== 200) {
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request.';
        }
    };
    ajax.send();
}