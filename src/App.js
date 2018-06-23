import React, { Component, Fragment } from 'react';
import SceneCard from "./components/SceneCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import scenes from "./scenes.json";
import './App.css';
import headerImage from "./headerImg.gif";
import backgroundImage from "./backgroundImg.jpg";

let correctGuesses = 0;
let highScore = 0;
let displayMessage = <p>Click a scene to begin<br/>but don't click on a the same scene twice!</p>;

class App extends Component {
// Setting this.state.scenes to the scenes json array
state = {
  scenes,
  displayMessage,
  correctGuesses,
  highScore
};

setClicked = id => {
  const scenes = this.state.scenes;

  const clickedMatch = scenes.filter(scenes => scenes.id === id);

    if (clickedMatch[0].clicked) {

      correctGuesses = 0;
      displayMessage = "You already clicked that one. Game over!";

      for (let i = 0; i < scenes.length; i++) {
        scenes[i].clicked = false;
      }
      this.setState({ displayMessage });
      this.setState({ correctGuesses });
      this.setState({ scenes });
    } else if (correctGuesses < 11) {
      clickedMatch[0].clicked = true;
      correctGuesses++;
      displayMessage = "Keep going!";

      if (correctGuesses > highScore) {
        highScore = correctGuesses;
        this.setState({ highScore });
      }

      scenes.sort(function(a,b){return 0.5 - Math.random()});

      this.setState({ displayMessage });
      this.setState({ correctGuesses });
      this.setState({ scenes });
    } else {
      clickedMatch[0].clicked = true;

      correctGuesses = 0;

      displayMessage = "You Won!";
      highScore = 15;
      this.setState({ highScore });

      for (let i = 0; i < scenes.length; i++) {
        scenes[i].clicked = false;
      }
      scenes.sort(function(a,b) {return 0.5 - Math.random()});
      this.setState({ displayMessage });
      this.setState({ correctGuesses });
      this.setState({ scenes });
    }
};

// Map over this.state.scenes and render a SceneCard component fro each scene obj
  render() {
    return (
      <Fragment className="Fragment">
      <img src={backgroundImage} className="Background-image" alt="cloudbackground"/>
        <Navbar>
            <li>Clicky Game</li>
            <li>{this.state.displayMessage}</li>
            <li>Correct Guesses: {this.state.correctGuesses} | High Score: {this.state.highScore}</li>
        </Navbar>
        <Header>
        <img src={headerImage} className="Header-image" alt="totorowalk"/>
          <h1>My Neighbor Totoro</h1>
        </Header>

        <Wrapper className="Wrapper">
        {this.state.scenes.map(scene => (
          <SceneCard 
            setClicked={this.setClicked}
            id={scene.id}
            key={scene.id}
            image={scene.image}
          />
        ))}
       
      </Wrapper>
      <Footer className="Footer"><h5>Clicky Game<br/>By Katie Wang</h5></Footer>
      </Fragment>
    );
  }
}

export default App;
