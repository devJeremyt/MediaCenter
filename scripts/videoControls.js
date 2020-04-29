const vid = document.querySelector('#video');
let currentTime = vid.currentTime;

window.addEventListener('keydown', event =>{
        if(event.code == 'Space'){
            if(vid.paused){
                vid.play();
            }else{
                vid.pause();
            }
            
        }
});

vid.addEventListener('ended', ()=>{
    const http = new XMLHttpRequest();
    const nextURL = window.location.pathname.replace('watch', 'next')
    http.open("GET", nextURL);
    http.send()
    
    http.onreadystatechange =(e) =>{
        vid.src = http.responseText;
    }
});

function getPlayedTime(){
    currentTime = vid.currentTime;
    fetch(window.location, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({"currentTime": currentTime})
    })
}

setInterval(getPlayedTime, 10000);

