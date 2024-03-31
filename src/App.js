import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Menu from "./Components/Menu"
import Snake from './Components/Snake';
import Food from './Components/Food';
import Button from './Components/Button';

function App() {

  const getRandomFood = () => {
    let min = 1
    let max = 98

    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    
    return [x,y]
  }

  const initialState = {
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 100,
    route: "menu",
    snakeDots: [
      [0, 0],
      [0, 2]
    ]
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    const interval = setInterval(moveSnake, state.speed)
    document.onkeydown = onkeydown

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line
  },[state])

  useEffect(()=>{
    onSnakeOutOfBounds()
    onSnakeCollapsed()
    onSnakeEats()
    // eslint-disable-next-line
  },[state.snakeDots])

  const onkeydown = (e) => {
    e = e || window.event;
    console.log("e",e);
    switch (e.keyCode) {
      case 37:
        setState((prevState) => ({ ...prevState, direction: "LEFT" }))
        break;
      case 38:
        setState((prevState) => ({ ...prevState, direction: "UP" }))
        break;
      case 39:
        setState((prevState) => ({ ...prevState, direction: "RIGHT" }))
        break;
      case 40:
        setState((prevState) => ({ ...prevState, direction: "DOWN" }))
        break;
      default:
        break;
    }
  }

  const moveSnake = () => {
    let dots = [...state.snakeDots];
    // console.log("dots",dots);
    let head = dots[dots.length - 1];
    console.log("head",head);

    if (state.route === "game") {
      switch (state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]]
          console.log("head2",head);
          break;

        case "LEFT":
          head = [head[0] - 2, head[1]]
          break;

        case "DOWN":
          head = [head[0], head[1] + 2]
          break;

        case "UP":
          head = [head[0], head[1] - 2]
          break;

        default:
          break;
      }
      dots.push(head)
      console.log("abc",dots);
      dots.shift();
      console.log("def",dots);
      setState((prevState) => ({
        ...prevState,
        snakeDots: dots,
      }))
      console.log("State",state);
    }
    // console.log("dots1",dots);
  }

  const onSnakeOutOfBounds = ()=>{
    let head = state.snakeDots[state.snakeDots.length - 1]
    if(state.route === "game"){
      if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
        gameOver();
      }
    }
  }

  const onSnakeCollapsed = ()=>{
    let snake = [...state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot)=>{
      if(head[0] === dot[0] && head[1] === dot[1]){
        gameOver();
      }
    })
  }

  const onSnakeEats = ()=>{
    let head = state.snakeDots[state.snakeDots.length - 1]
    let food = state.food
    if(head[0] === food[0] && head[1] === food[1]){
      setState((prevState)=>({
        ...prevState,
        food: getRandomFood()
      }))
      increaseSnake()
      increaseSpeed()
    }
  }

  const increaseSnake = ()=>{
    let newSnake = [...state.snakeDots]
    newSnake.unshift([])
    setState((prevState)=>({
      ...prevState,
      snakeDots: newSnake
    }))
  }

  const increaseSpeed = ()=>{
    if(state.speed > 10){
      setState((prevState)=>({
        ...prevState,
        speed: prevState.speed - 20
      })) 
    }
  }

  const gameOver = ()=>{
    alert(`GAME OVER, your score is ${state.snakeDots.length - 2}`)
    setState(initialState);
  }

  const onRouteChange = () => {
    setState((prevState) => ({
      ...prevState,
      route: "game"
    }))
  }

  const onDown = ()=>{
     let dots = [...state.snakeDots]
     let head = dots[dots.length - 1]
     
     head = [head[0],head[1]+2]
     dots.push(head)
     dots.shift()
     setState((prevState)=>({
        ...prevState,
        direction : "DOWN",
        snakeDots : dots
     }))
  }

  const onUp = ()=>{
    let dots = [...state.snakeDots]
    let head = dots[dots.length-1]

    head = [head[0],head[1]-2]
    dots.push(head)
    dots.shift()
    setState((prevState)=>({
      ...prevState,
      direction : "UP",
      snakeDots : dots
    }))
  }

  const onRight = ()=>{
    let dots = [...state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    setState((prevState) => ({
      ...prevState,
      direction: "RIGHT",
      snakeDots: dots,
    }))
  }

  const onLeft = ()=>{
    let dots = [...state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    setState((prevState) => ({
      ...prevState,
      direction: "LEFT",
      snakeDots: dots,
    }));  
  }

  return (
    <>
      <div>
        {
          state.route === "menu" ? (
            <div>
              <Menu onRouteChange={onRouteChange} />
            </div>
          ) : <div>
            <div className='game-area'>
              <Snake snakeDots={state.snakeDots} />
              <Food dots={state.food} />
            </div>
            <Button onDown={onDown} onLeft={onLeft} onRight={onRight} onUp={onUp} />
          </div>
        }
      </div>
    </>
  );
}

export default App;
