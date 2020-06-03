import React from 'react';
import './BackgroundVideo.css';
import backVideo from './rain-scene-medium.mp4';

const BackgroundVideo = () => {
    return (
        <div className="bg-video">
            <video
                className="bg-video__content"
                autoPlay={true}
                muted={true}
                loop={true}
            >
                <source src={backVideo} type="video/mp4" />
                "Your broswer is not support!"
            </video>
        </div>
    );
};

export default BackgroundVideo;
