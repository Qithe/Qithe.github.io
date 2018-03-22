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
    //let ajax = new XMLHttpRequest();
    fetch(newUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // AJAX lyckades, presentera svaret
        console.log(data);
        theKey = data.key;
        document.getElementById('OutputMessage').innerHTML = 'Din key är ' + theKey + ', bara så du vet ;)';
    })
    .catch(function(message){
        document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request i GetApiKey.';
    });
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
    fetch(newUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        document.getElementById('OutputMessage').innerHTML += 'AD ' + data.status;
    })
    /*.then(function(data){
        if(data.status === 'Success'){
            ViewData();
        }
    })*/
    .catch(function(message){
        document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request i AddData.';
    })
}

function ViewData() {
    let querystring = '?op=select&key=' + theKey;
    let newUrl = url+querystring;
    let previousContent = document.getElementById('BooksAuthors').innerHTML;
    
    //do{
        fetch(newUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.data);
            document.getElementById('BooksAuthors').innerHTML = '';
            for(i in data.data){
                console.log(data.data[i].title);
                document.getElementById('BooksAuthors').innerHTML += '<option value="book">' + data.data[i].title + ', ' + data.data[i].author;
            }    
        })
        .catch(function(message){
            document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request i ViewData.';
        })
    //}while(document.getElementById('BooksAuthors').innerHTML === previousContent);
}