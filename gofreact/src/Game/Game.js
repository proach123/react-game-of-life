import React from 'react';
import {  Button, ButtonGroup, Container, Typography, TextField } from '@material-ui/core';
import './Game.css';
import DropDown from './DropDown'


let CELL_SIZE = 20;

let globalRows = 450 
let globalCols = 800 

// 800
// 450
class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.rows = globalRows / CELL_SIZE;                                     ///this.rows = HEIGHT / CELL_SIZE;
        this.cols = globalCols / CELL_SIZE;                                      ///this.cols = WIDTH / CELL_SIZE;                   
        this.state = {
            cells: [],
            isRunning: false,
            interval: 100,
            generation: 0,
            listOpen: false,
            boardWidth: 800,
            boardHeight: 450,
            boardScale: 1
        }
        this.board = this.makeEmptyBoard();
    }

    

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {

        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor((offsetX) / CELL_SIZE);
        const y = Math.floor((offsetY) / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();
        let generation = this.state.generation

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let vecinos = this.calculateVecinos(this.board, x, y);
                if (this.board[y][x]) {
                    if (vecinos === 2 || vecinos === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && vecinos === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }
        generation++

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });
        this.setState({generation: generation});

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }


    calculateVecinos(board, x, y) {
        let vecinos = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                vecinos++;
            }
        }

        return vecinos;
    }

    handleIntervalChange = (e) => {
        this.setState({ interval: e.target.value });
    }

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
        this.setState({generation:0})
    }

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    handleGlider = () => {
        
        this.board[6][2] = true
        this.board[6][3] = true
        this.board[7][3] = true
        this.board[7][2] = true

        this.board[6][12] = true
        this.board[7][12] = true
        this.board[8][12] = true
        this.board[9][13] = true
        this.board[5][13] = true
        this.board[4][14] = true

        this.board[4][15] = true
        this.board[5][17] = true
        this.board[7][16] = true
        this.board[6][18] = true
        this.board[7][18] = true
        this.board[8][18] = true
        this.board[9][17] = true
        this.board[10][15] = true
        this.board[10][14] = true

        this.board[7][19] = true
        this.board[6][22] = true
        this.board[5][22] = true
        this.board[4][22] = true
        this.board[6][23] = true
        this.board[5][23] = true
        this.board[4][23] = true
        this.board[7][24] = true
        this.board[7][26] = true
        this.board[8][26] = true
        this.board[3][24] = true
        this.board[3][26] = true
        this.board[2][26] = true

        this.board[4][36] = true
        this.board[5][36] = true
        this.board[4][37] = true
        this.board[5][37] = true

        this.setState({cells: this.makeCells()})
    }

    handleRIP = () => {
        let x = 11
        let y = 5
        
        this.board[10+y][5+x] = true
        this.board[11+y][6+x] = true
        this.board[10+y][7+x] = true
        this.board[8+y][7+x] = true
        this.board[7+y][7+x] = true
        this.board[6+y][7+x] = true
        this.board[6+y][8+x] = true
        this.board[6+y][9+x] = true
        this.board[7+y][9+x] = true
        this.board[8+y][9+x] = true
        this.board[9+y][8+x] = true
        this.board[10+y][8+x] = true
        this.board[11+y][8+x] = true
        this.board[12+y][8+x] = true
        this.board[13+y][7+x] = true
        this.board[14+y][7+x] = true
        this.board[10+y][9+x] = true
        this.board[11+y][10+x] = true
        this.board[12+y][11+x] = true
        this.board[13+y][9+x] = true
        this.board[14+y][9+x] = true

    this.setState({cells: this.makeCells()})
    }

    handlePat = () => {
        for(let i = 0; i < 10; i++){
            this.board[5 + i][5] = true
        }
        for(let i = 0; i < 10; i++){
            this.board[5 + i][15] = true
        }
        for(let i = 0; i < 10; i++){
            this.board[5 + i][25] = true
        }
        for(let i = 0; i < 10; i++){
            this.board[5 + i][35] = true
        }
    this.setState({cells: this.makeCells()})
    }

    // handleScaleChangeUp = () => {
    //     let scale = this.boardScale
    //     scale++
    //     console.log(scale)
    //     if(scale > 0){
    //         this.setState({boardScale: scale})
    //         this.setBoardOffScale()
    //     }else(alert('cannot go below zero'))
    // }

    // handleScaleChangeDown = () => {
    //     let scale = this.boardScale
    //     scale--
    //     console.log(scale)
    //     if(scale > 0){
    //         this.setState({boardScale: scale})
    //         this.setBoardOffScale()
    //     } else(alert('cannot go below zero'))
    // }

    // setBoardOffScale = () => {
    //     let newBoard = this.makeEmptyBoard()
    //     const {boardScale, boardWidth, boardHeight} = this.state
    //     let newCols = (boardWidth * boardScale) / CELL_SIZE;
    //     let newRows = (boardHeight * boardScale) / CELL_SIZE;
    //     if(newCols && newRows > 0){
    //         this.setState({cols:newCols, rows:newRows})
            
    //         this.handleNewBoard(newBoard)
    //     }
    //     else(alert('Can not go below zero'))
    //     console.log(this.state.cols, this.state.rows)
    // }


    
    render() {
        const { cells, interval, isRunning, generation, listOpen, boardWidth, boardHeight, boardScale } = this.state;

        return (
            <Container>
                <Container className="board"
                    style={{ width: boardWidth * boardScale, height: boardHeight * boardScale, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
                    ))}
                </Container>

                <Container className="controls">
                    Update every

                    <TextField value={this.state.interval} onChange={this.handleIntervalChange} />
                    Miliseconds 
                    
                    <ButtonGroup size="small" variant="contained" color="primary">
                    {isRunning ?
                        <Button variant="contained" onClick={this.stopGame}>Stop</Button>:
                        <Button variant="contained" onClick={this.runGame}>Run</Button>
                    }
                        <Button variant="contained"  onClick={this.handleClear}>Clear</Button>
                    </ButtonGroup>
                    <DropDown handleGlider={this.handleGlider} handleRIP={this.handleRIP} handleRandom={this.handleRandom} handlePat={this.handlePat}></DropDown>

                    <Typography variant="h6" component="h2"> Generation:  {generation}</Typography>

                    {/* <ButtonGroup size="small" variant="contained" color="secondary">
                    <Button onClick={this.handleScaleChangeUp}>+</Button>
                    <Button onClick={this.handleScaleChangeDown}>-</Button>
                    </ButtonGroup> */}
                    
                    
                    
                </Container>
            </Container>
        );
    }
}


export default Game;