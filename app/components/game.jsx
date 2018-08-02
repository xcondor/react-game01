import React, { Component } from 'react';
import Board from "../components/board.jsx";

class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(25).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handlerClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    calculateWinner (squares) {
        //获胜所可能得到的数组
        // const lines = [
        //     [0, 1, 2],
        //     [3, 4, 5],
        //     [6, 7, 8],
        //     [0, 3, 6],
        //     [1, 4, 7],
        //     [2, 5, 8],
        //     [0, 4, 8],
        //     [2, 4, 6],
        // ];
        const lines = [
            [0,1,2,3,4],
            [5,6,7,8,9],
            [10,11,12,13,14],
            [15,16,17,18,19],
            [20,21,22,23,24],
            [0,5,10,15,20],
            [1,6,11,16,21],
            [2,7,12,17,22],
            [3,8,13,18,23],
            [4,9,14,19,24],
            [1,6,12,18,24],
            [4,8,12,16,20]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c,d,e] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
                return squares[a];
            }
        }
        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    render(){
        // const history = this.state.history;
        // const current = history[history.length - 1];;
        // const winner = this.calculateWinner(current.squares);
        const history = this.state.history; //历史操作记录
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        const moves = history.map((step,move)=>{
            const desc = move ? 'Move #' + move : 'Game Start';
            return(
                <li key={move}><a href="#" onClick={()=>this.jumpTo(move)}>{desc}</a></li>
            )
        });
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
                <ol>
                    {moves}
                </ol>
            </div>
        )
    }
}

export default Game;