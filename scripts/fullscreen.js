let body = document.querySelector('html');
let video = document.querySelector('#video');

const listener = function(){body.addEventListener('click', ()=>{
    if(!document.mozFullScreenElement){
        video.requestFullscreen();
    } else if(!document.webkitFullscreenElement){
        video.requestFullscreen();
    }
});
}

video.addEventListener( "loadedmetadata", ()=>{
    let vidheight = video.videoHeight;
    let vidwidth = video.videoWidth;

    let winheight = window.innerHeight;
    let winwidth = window.innerWidth;

    let vidratio = vidheight / vidwidth;
    let winratio = winheight / winwidth;
    
    if(vidratio < winratio){
        video.style.height = "auto"
        video.style.width = winwidth.toString() + "px";
    } else{
        video.style.height = winheight.toString() + "px";
        video.style.width = "auto";
    }
})


listener()




