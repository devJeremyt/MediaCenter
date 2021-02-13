import React from 'react';
import VideoSelection from './videoSelection';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewableVideos: [],
            startIndex: 0,
        }
        this.updateViewableVideos = this.updateViewableVideos.bind(this);
    }

    componentDidMount(){
        this.updateViewableVideos();
        this.resizeWindow();
    }

    resizeWindow(){
        window.addEventListener('resize', this.updateViewableVideos);
    }

    updateViewableVideos(){
        this.setState({
            viewableVideos: this.props.videos.slice(this.state.startIndex, this.state.startIndex + (window.innerWidth / 255)),
        })
    }

    moveBackward(){
        let nextStartIndex = this.state.startIndex - 1;
        let nextEndIndex = nextStartIndex + (window.innerWidth / 255);
        if(nextStartIndex > 0){
            this.setState({
                startIndex: nextStartIndex,
                viewableVideos: this.props.videos.slice(nextStartIndex, nextEndIndex),
    
            })
        }
        console.log(this.state.startIndex);
    }
    
    moveForward(){
        let nextStartIndex = this.state.startIndex + 1;
        let nextEndIndex = nextStartIndex + (window.innerWidth / 255);
        if(this.props.videos.length > nextEndIndex){
            this.setState({
                startIndex: nextStartIndex,
                viewableVideos: this.props.videos.slice(nextStartIndex, nextEndIndex),
    
            })
        }
        console.log(this.state.startIndex + " " + (window.innerWidth / 255));
    }

    render(){
        return (
            <div>
                <h4>{this.props.name}</h4>
                <div class='row' id={this.props._id}>
                    <span class="left handle" id="backButton" onClick= {()=> this.moveBackward(this.props._id)}>‹</span>
                    <VideoSelection videos={this.state.viewableVideos}/>
                    <span class="right handle" id="forward-button" onClick= {()=> this.moveForward()}>›</span>
                </div>  
            </div>  
        )
    }   
}



export default Category;