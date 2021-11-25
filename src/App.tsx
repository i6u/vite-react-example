import {useState} from "react";

const Square = ({value, onClick}: { value: string, onClick: Function }) => {
    return (
        <button className="square" onClick={onClick()}>
            {value}
        </button>
    )
}

const Board = ({squares, onClick}: { squares: string[], onClick: Function }) => {

    const renderSquare = (i: number) => {
        return <Square
            value={squares[i]}
            onClick={() => {
                onClick(i)
            }}
        />
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export const Game = () => {
    let initialState = ["", "", "", "", "", "", "", "", ""];
    const [history, setHistory] = useState([{squares: initialState}])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)

    const handleClick = (i: number) => {
        const _history = history.slice(0, stepNumber + 1)
        const current = _history[_history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O'
        setHistory(_history.concat([{squares: squares}]))
        setStepNumber(_history.length)
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step: number) => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const _history = history
    const current = _history[stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = _history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => {
                    jumpTo(move)
                }}>{desc}</button>
            </li>
        )
    })

    let status: string;
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i: number) => {
                        handleClick(i)
                    }}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>{moves}</div>
            </div>
        </div>
    )
}

function calculateWinner(squares: string[]) {
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
