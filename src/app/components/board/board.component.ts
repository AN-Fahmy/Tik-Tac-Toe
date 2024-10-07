import { NgClass, NgStyle } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board:WritableSignal<string[]> = signal(Array(9).fill(null))
  currentPlayer:WritableSignal<string> = signal('X')
  winner:WritableSignal<string | null> = signal(null)
  xWin:WritableSignal<number> = signal(0)
  oWin:WritableSignal<number> = signal(0)

  makeMove(index:number){
    if(!this.board()[index] && !this.winner()){
      const newBoard = [...this.board()]
      newBoard[index] = this.currentPlayer()
      this.board.set(newBoard)

      if(this.checkWinner()){
        this.winner.set(this.currentPlayer())
        this.updateCountPlayer(this.currentPlayer())
      } else {
        this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X')
      }
    }
  }


  checkWinner():boolean{
    const combinationsWinner = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for(let combintaion of combinationsWinner){
      const [a,b,c] = combintaion
      if(this.board()[a] && this.board()[a] === this.board()[b] && this.board()[a] === this.board()[c]){
        return true
      }
    }

    return false
  }

  drawGame(){
    return this.board().every(cell => cell !== null)
  }

  updateCountPlayer(player:string){
    if(player === 'X'){
      this.xWin.set(this.xWin() + 1)
    } else{
      this.oWin.set(this.oWin() + 1)
    }
  }

  resetGame(){
    this.board.set(Array(9).fill(null))
    this.currentPlayer.set('X')
    this.winner.set(null)
  }

}
