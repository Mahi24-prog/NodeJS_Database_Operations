var tcs = `<img src="./images/tcs.png" alt="tcs">`;
var fresco = `<img src="./images/fresco.png" alt="fresco">`;
var boxElement = document.getElementsByClassName("col"); 
var change_theme = document.getElementsByClassName("change_theme");
var restart_btn = document.getElementsByClassName("restartBtn");
var restart_btn = document.getElementsByClassName("restart");
var heading = document.getElementsByClassName("heading");


// Authentication**************


function auth(){

    var users = [
        {
            username : "user1",
            password : "user1"
        },
        {
            username : "user2",
            password : "user2"
        }
    ]
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    localStorage.removeItem(`user`)
    localStorage.setItem(`user`,username)

    for(i=0; i<users.length; i++){
        if(username == users[i].username && password == users[i].password){

            location.replace("/dashboard");
            break;
        }
        // else{
        //     alert('Login Failed!  Username Or Password Invalid')
        // }
    }

}
// ************************

if(localStorage.getItem('user') == 'user1'){
    for(i=0;i<9;i++){
        boxElement[i].innerHTML = localStorage.getItem(`1Box${i}`);
    }
}
else if(localStorage.getItem('user') == 'user2'){
    for(i=0;i<9;i++){
        boxElement[i].innerHTML = localStorage.getItem(`2Box${i}`);
    }
}



var theme = "text";

function changeTheme(){

    for(i=1;i<=9;i++){
        localStorage.setItem(`Box${i}`,"")
    }

    if (theme == "text"){
        theme = "img";
        change_theme[0].innerHTML = "Swich to Text";
        change_theme[0].style.backgroundColor = "#fa6969";
        restart();
    }
    else{
        theme = "text";
        change_theme[0].innerHTML = "Swich to Image";
        change_theme[0].style.backgroundColor = "#469af4";
        restart();
    }
}


function changeSign(box){
    restart_btn[0].style.backgroundColor = "#469af4";
    restart_btn[0].style.color = "white";
    

    if (theme == "text"){
        heading[0].style.color = '#'+Math.floor(Math.random()*16777215).toString(16);

        if(box.innerHTML == ""){
            box.innerHTML = "X";
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,"X")
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,"X")
            }
        }
        else if(box.innerHTML == "X"){
            box.innerHTML = "O";
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,"O")
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,"O")
            }
        }
        else if(box.innerHTML == "O"){
            box.innerHTML = "";
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,"")
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,"")
            }
        }
    }
    else if(theme == "img"){
        heading[0].style.color = '#'+Math.floor(Math.random()*16777215).toString(16);
        
        if(box.innerHTML == ""){
            box.innerHTML = tcs;
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,tcs)
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,tcs)
            }
        }
        else if(box.innerHTML == tcs){
            box.innerHTML = fresco;
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,fresco)
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,fresco)
            }
        }
        else if(box.innerHTML == fresco){
            box.innerHTML = "";
            const id = box.id;
            if(localStorage.getItem('user') == 'user1'){
                localStorage.removeItem(`1Box${id}`)
                localStorage.setItem(`1Box${id}`,"")
            }
            else if(localStorage.getItem('user') == 'user2'){
                localStorage.removeItem(`2Box${id}`)
                localStorage.setItem(`2Box${id}`,"")
            }
        }
    }
            
}

function restart(){
    
    restart_btn[0].style.backgroundColor = "#cad5e3";
    restart_btn[0].style.color = "black";

    heading[0].style.color = "black";

    for (i=0; i<9; i++){
        boxElement[i].innerHTML = "";
        localStorage.removeItem(`1Box${i}`)
        localStorage.setItem(`1Box${i}`,"")
        localStorage.removeItem(`2Box${i}`)
        localStorage.setItem(`2Box${i}`,"")
    }

}













