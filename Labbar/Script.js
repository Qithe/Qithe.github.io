// Your code here!
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
let theKey;



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

function AddData(tries, statusMessage) {
    let title = document.getElementById('Title').value;
    let author = document.getElementById('Author').value;
    
    //Sets standard values
    if(tries === undefined){tries = 1;}
    if(statusMessage === undefined){statusMessage = '';}
    
    if(title!=='' && author!==''){
        if (tries <= 10 && statusMessage !== 'success')
        {   //Checks how many times it tried to push, if less than 10, it will try to push
            console.log('Try nr '+tries+' to push');
            let callbackAdd = function(statusMessage) {
                //statusMessage = PushToDatabase(title,author);
                console.log(statusMessage+' Push tried')
                if (statusMessage === 'success')
                {   //if succsessful, clear inputs
                    console.log('Push was '+statusMessage);
                    document.getElementById('OutputMessage').innerHTML = '';
                    document.getElementById('Title').value='';
                    document.getElementById('Author').value='';
                } 
                else
                {   //If not succsessful, try again
                    tries++;
                    AddData(tries, statusMessage);
                }
            }
            PushToDatabase(title, author, callbackAdd);
        }
        else if(tries > 10 && statusMessage !== 'success')
        {   //if previus try was not sucsessful, and it have tried 10 times, do this
            console.log('Push was '+statusMessage);
            document.getElementById('OutputMessage').innerHTML = 'Något gick fel, var god görsök igen';
        }
    }
    else
    {   //If one or both inputfield are emty, do this
        document.getElementById('OutputMessage').innerHTML = 'Du måste fylla i både en titel och författare';
        console.log('Författare och/eller titel saknades i sina text fält');
    }
    ViewData();
}


 
function PushToDatabase(title, author, callback){
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
        callback(data.status);
        
    })
    .catch(function(message){
        document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request i AddData.';
    })
    
}

function ViewData(tries, statusMessage){
    //Sets default values if none exists
    if(tries === undefined){tries = 1;}
    if(statusMessage === undefined){statusMessage = '';}
    
    if (tries <= 10 && statusMessage !== 'success')
    {   //Checks how many times it tried to push, if less than 10, it will try to push
        console.log('Try nr '+tries+' to pull');
        let callbackView = function(statusMessage) {
            //statusMessage = PushToDatabase(title,author);
            console.log(statusMessage+' Pull tried')
            if (statusMessage === 'success')
            {   //if succsessful, clear inputs
                console.log('Pull was '+statusMessage);
            } 
            else
            {   //If not succsessful, try again
                tries++;
                ViewData(tries, statusMessage);
            }
        }
        PullFromDatabase(callbackView);
    }
    else if(tries > 10 && statusMessage !== 'success')
    {   //if previus try was not sucsessful, and it have tried 10 times, do this
        console.log('Pull was '+statusMessage);
        document.getElementById('OutputMessage').innerHTML = 'Något gick fel, var god görsök igen';
    }
    
    
}

function PullFromDatabase(callback) {
    let querystring = '?op=select&key=' + theKey;
    let newUrl = url+querystring;
    let previousContent = document.getElementById('BooksAuthors').innerHTML;
    
    
    fetch(newUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.data);
        document.getElementById('BooksAuthors').innerHTML = '';
        callback(data.status);
        for(i in data.data){
            document.getElementById('BooksAuthors').innerHTML += '<option value="book">' + data.data[i].title + ', ' + data.data[i].author;
        }    
    })
    .catch(function(message){
        document.getElementById('OutputMessage').innerHTML = 'Ett okänt fel inträffade vid AJAX request i ViewData.';
    })

}