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

