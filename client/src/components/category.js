import React from 'react';
import VideoSelection from './videoSelection';

class Category extends React.Component{
    render(){
        return (
            <div>
                <h4>{this.props.name}</h4>
                <div class='row' id="{this.props.id}">
                    <span class="left handle" id="backButton"onclick="moveBackward(`<%=category.id%>`)">‹</span>
                    <VideoSelection videos={this.props.videos}/>
                    <span class="right handle" id="forward-button" onclick="moveForward(`<%=category.id%>`)">›</span>
                </div>  
            </div>  
        )
    }   
}

export default Category;