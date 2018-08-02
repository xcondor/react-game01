import React, { Component } from 'react';
import Board from "../components/board.jsx";

class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    handlerClick(i){
        const history = this.state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        });
    }

    calculateWinner (squares) {
        //获胜所可能得到的数组
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    render(){
        const history = this.state.history;
        const current = history[history.length - 1];;
        const winner = this.calculateWinner(current.squares);
        let status ;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div className="game">
                <Board squares={current.squares} onClick={(i)=> this.handlerClick(i)}/>
                <div className="game_info">{status}</div>
            </div>
        )
    }
}

export default Game;