import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
        return (
            <button className = "square" onClick=
              {props.onClick}> 
              {props.value} 
            </button>
        );
}

class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (
        <div>
          <h3>Jogadores</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo"></label>
            <label htmlFor="new-todo">
              Digite o nome do jogador
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Adicionar #{this.state.items.length + 1}
            </button>    
          </form>
        </div>
      );
    }
    handleChange(e) {
      if (this.state.items.length < 2) {
        this.setState({ text: e.target.value })
      }
    }
        handleSubmit(e) {
          e.preventDefault();
          if (this.state.text.length === 0) {
            return;
          }
         const player = {
            text: this.state.text,
            id: Date.now()
          };
          this.setState(state => ({
            items: state.items.concat(player),
            text: ''
          }));
        }
      
}

/////////////////////////////////////////////////

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext:true,
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner(squares)|| squares[i]){
            return;
        }
            squares[i]=this.state.xIsNext ? 'X':'O';
            this.setState({
                squares:squares,
                xIsNext:!this.state.xIsNext,
            });
    }
    renderSquare(i) {
        return <Square
         value={this.state.squares[i]}
         onClick={ () => this.handleClick(i)} /> ;
    }

    render() {
        const winner =
        calculateWinner(this.state.squares);
        let status;
        if(winner){
            status='Vencedor: '+ winner;
        }else{
            status = 'Próximo Jogador: '+
           (this.state.xIsNext?'X':'O');
        }

        return ( 
        < div >
            <div className = "status" > { status } </div>
            <div className = "board-row" >
                { this.renderSquare(0) } 
                { this.renderSquare(1) }
                { this.renderSquare(2) }
            </div> 
            <div className = "board-row" >
                { this.renderSquare(3) } 
                { this.renderSquare(4) } 
                { this.renderSquare(5) } 
            </div> 
            <div className = "board-row" > 
                { this.renderSquare(6) } 
                { this.renderSquare(7) } 
                { this.renderSquare(8) } 
            </div>  
        </div>
        );
    }
}

class Game extends React.Component {
    render() { 
        return ( 
           
            <div className = "game">
                <div className = "game-board" >
                       <Board />
                </div>
                 <div className = "game-info" >
                    <div> { /* status */ } </div> 
                     <ol> { /* TODO */ } </ol>
                 </div >
            </div>
        );
    }
}
  class TodoList extends React.Component {
    render() {
          return (
            <ul>
                  {this.props.items.map(item => (
                  <li key={item.id}>{item.text}</li>            
                  ))}
            </ul>
          );
      }
      
    }
// ========================================

ReactDOM.render( < Game /> ,
    document.getElementById('root'),
);

newFunction();

function newFunction() {
    ReactDOM.render(<TodoApp />, document.getElementById('example'));
}

function calculateWinner(squares) {
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