import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any = ""
  questionSelected:any = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0
  finished:boolean = false
  
  answers:string[] = []
  answerSelected:string = ""

  constructor() {
  }

  ngOnInit(): void {
    if (quizz_questions) {
      this.questionIndex = 0
      this.finished = false

      this.title = quizz_questions.title
      this.questionMaxIndex = this.questions.length

      this.questions = quizz_questions.questions
      this.questionMaxIndex = this.questions.length
      this.questionSelected = this.questions[this.questionIndex]
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {    
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
    
  }

  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i, array) => {
      if (array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })

    return result
  }

}
