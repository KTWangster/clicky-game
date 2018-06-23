import React from "react";
import "./SceneCard.css";

const SceneCard = props => (
    <div className="card" onClick={() => props.setClicked(props.id)}>
        <div className="img-container">
            <img alt={props.name} src={props.image} />
        </div>
    </div>

);

export default SceneCard;