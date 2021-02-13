import React from 'react'

class Card extends React.Component{

    render() {
        return (
            <div class="card">
                <div class="flex-centered">
                    <a href={'/watch/' + this.props.video._id + '?playmethod=beginning'} class="begin-btn play-method">Beginning</a>
                    <img class="responsize-resize" src={this.props.video.thumbnail} alt=""></img>
                    <a href={'/watch/' + this.props.video._id + '?playmethod=resume'} class="play-method resume-btn">Resume</a>
            </div>
                <h4 id='video-title' class="flex-centered">{this.props.video.title}</h4>
            </div>
        );
    }
}

export default Card;