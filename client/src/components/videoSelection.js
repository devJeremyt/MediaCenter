import React from 'react'
import Card from './card'

class VideoSelection extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let videos = [];
        this.props.videos.forEach(video =>{
            videos.push(
                <Card video={video}/>
            )
        })

        return(
            <div class= 'video-selection'>{videos}</div>
        )
    }
}

export default VideoSelection;