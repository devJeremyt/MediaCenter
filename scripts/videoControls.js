const vid = document.querySelector('#video');

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
})

