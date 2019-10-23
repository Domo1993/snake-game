import React, { Component } from 'react';
// Importing components
import Snake from './Components/Snake';
import Food from './Components/Food';
import Rules from './Components/Rules';
import Highscore from './Components/Highscore';
// Importing bootstrap layout components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Images
import SnakeHeader from './Images/snakeHeader.jpg';
// A module that animates text
import { Wave } from 'react-animated-text';

// Getting random coodinates for the food's location
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}


class App extends Component {
// Setting the initial states
  constructor(){
    super();
    this.state = {
      food: getRandomCoordinates(),
      speed: 0,
      direction: 'RIGHT',
      // starting point of the snake
      snakeDots: [
        [0,0],
        [2,0]
      ],
      level:0,
      // Below is the highscore names and scores
      name1:"John Doe",
      highscore1:5,
      name2:"John Doe",
      highscore2:4,
      name3:"John Doe",
      highscore3:2,
      waveAnimation: false
    }
  }

// Enables the usage of the keyboard buttons for the game
componentDidMount() {
  document.onkeydown = this.onKeyDown;
}

// Used as a reference variable that will be to used to stop the setinterval function 
timeToStop = 0

// Speed level 1 which starts the snakes movement by calling other functions
  speed1 = () => {
    this.setState({speed:120,waveAnimation:true,level:1});
    this.timeToStop = setInterval(this.moveSnake, 120);
  }
// Speed level 2 which starts the snakes movement by calling other functions
  speed2 = () => {
    this.setState({speed:70,waveAnimation:true,level:2});
    this.timeToStop = setInterval(this.moveSnake, 70);
  }
// Speed level 3 which starts the snakes movement by calling other functions
  speed3 = () => {
    this.setState({speed:20,waveAnimation:true,level:3});
    this.timeToStop = setInterval(this.moveSnake, 20);
  }

// Assigning keyboard input
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  // This function deals with the movement of the snake
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  // This function checks if the snake hits any of the barriers, if so, it will call the game over function
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
// This function checks if the snake hits itself, if so, the game over function will be called
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }
// This function checks if the snake ate food (mouse), if so, the enlarge function will be called which increases the size of the snake.
  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates(),
        speed: this.state.speed - 10
      })
      this.enlargeSnake();
    }
  }
// This function increases the size of the snake
  enlargeSnake = () => {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }
// The function is called once the user hits a barrier or clicks the directional key in the opposite direction of the snake's movement
// This function changes the states of names and high scores
// It also resets the states of the game
  onGameOver() {
    if(this.state.snakeDots.length>this.state.highscore1 && this.state.level === 1){
      let user = prompt(`Game Over. Snake length is ${this.state.snakeDots.length}\nYou made a new highscore!\nPlease enter your name below:`);
      this.setState({
        highscore1:this.state.snakeDots.length,
        name1:user
      })
    } else if (this.state.snakeDots.length>this.state.highscore2 && this.state.level === 2){
      let user = prompt(`Game Over. Snake length is ${this.state.snakeDots.length}\nYou made a new highscore!\nPlease enter your name below:`);
      this.setState({
        highscore2:this.state.snakeDots.length,
        name2:user
      })
    } else if (this.state.snakeDots.length>this.state.highscore3 && this.state.level === 3){
      let user = prompt(`Game Over. Snake length is ${this.state.snakeDots.length}\nYou made a new highscore!\nPlease enter your name below:`);
      this.setState({
        highscore3:this.state.snakeDots.length,
        name3:user
      })
    } else {
      alert(`Game Over. Snake length is ${this.state.snakeDots.length}\nTry again to make a new highscore.`)
    }
    // This function stops the setinterval function (which stops the snake's movement)
    clearInterval(this.timeToStop)
    // Resetting the states
    this.setState({
      food: getRandomCoordinates(),
      speed: 200,
      direction: 'RIGHT',
      snakeDots: [
        [0,0],
        [2,0]
      ],
      waveAnimation:false
    })
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  render() {
    return (
      <div>
        <Container fluid='false' id="main">
          <Row>
            <Col id="col1">
              <header>
              <Wave effectChange={0.5} effectDelay={1} speed={7} paused={this.state.waveAnimation} text="Snake Game" id="nameOfGame"/>
                <div id="imageDiv">
                  <img id="snakeHeader" src={SnakeHeader} alt="snake pic"/>
                </div>

              </header>
              <Container fluid="false">
                <Row>
                  <Col id="highCol" sm={3}>
                    <Highscore highscore1={this.state.highscore1} highscore2={this.state.highscore2} highscore3={this.state.highscore3} 
                    name1={this.state.name1} name2={this.state.name2} name3={this.state.name3}/>
                  </Col>
                  <Col sm={9}>              
                    <div id="rules_levels">
                      <div id="rules">
                        <Rules/>
                      </div>
                    
                      <h3 onClick={this.speed1}>Speed level 1</h3>
                      <h3 onClick={this.speed2}>Speed level 2</h3>
                      <h3 onClick={this.speed3}>Speed level 3</h3>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            {/* Game Area */}
            <Col id="game-section">
              <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food dot={this.state.food}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
