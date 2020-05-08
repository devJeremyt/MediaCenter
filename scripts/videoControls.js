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
    console.log(window.location);
    
    http.onreadystatechange =(e) =>{
        nextVideo = JSON.parse(http.responseText);
        vid.src = nextVideo.absPath;
        console.log(nextVideo._id)
        let url = `/watch/${nextVideo._id}`
        window.location.pathname = url;
        console.log(window.location);
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
    }).then(res => res.json())
    .then(response => console.log('Success: ', response))
    .then(error => console.error('Error: ', error));
}

// function getPlayedTime(){
//     currentTime = vid.currentTime;
//     console.log(currentTime);
// }

setInterval(getPlayedTime, 10000);

