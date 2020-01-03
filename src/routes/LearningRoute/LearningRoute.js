import React, { Component } from 'react'
import WordContext from '../../contexts/wordContext'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'
import config from '../config'
import TokenService from './token-service'



class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: '', 
      next: '',
      correctAns: 0,
      incorrectAns: 0,
      isCorrect: null, 
      score: '',
      usrInput: '',
      answer: ''
    }
  }

  static contextType = WordContext;

  componentDidMount(){
  fetch(`${config.API_ENDPOINT}/language/head`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
    },
})
    .then(res => {
        if (!res.ok) {
            return res.json().then(e => Promise.reject(e));
        }
        return res.json();
    })
    .then(res => {
        this.setState({
            current: res.next, score: res.score, correctAns: res.wordCorrectCount,
            incorrectAns: res.wordIncorrectCount, isCorrect: null
        });
    })
}

handleSubmit = (event) => {
event.preventDefault();
//get user input
if (this.state.isCorrect === null){
  const usrInput = event.target['learn-usrInput-input'].value;
  fetch(`${config.API_ENDPOINT}/language/usrInput`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({usrInput})
  }).then(res => {
      if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
      }
      return res.json();
  })
      .then(res => {
          console.log(res);
          this.setState({
              answer: res.answer, usrInput, score: res.score, isCorrect: res.isCorrect,
              correctAns: res.wordCorrectCount, incorrectAns: res.wordIncorrectCount, next: res.next
          });
      })
} else {
  //fetch GET call here?
    fetch(`${config.API_ENDPOINT}/language/head`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();
        })
        .then(res => {
            this.setState({
                current: this.state.next,
                //score: res.score,
                correctAns: res.wordCorrectCount,
                incorrectAns: res.wordIncorrectCount, isCorrect: null, answer: '', usrInput: '', next: ''
            });
        })
} 

};

handleInput(e) {
this.setState({usrInput: e.target.value})
}

  render() {

    const { error } = this.context

    return (
      <section>
        <h2>Translate the word:</h2>
        {error 
          ? <p className='red'>There was an error, try again</p>
          : this.renderWord()}
        

        <div> 
          <Label htmlFor='answer-input'> 
            Answer
          </Label> 
          <Input 
            id='answer-input'
            name='answer'
            required
          />
        </div> 
        <Button type='submit'>Submit Answer</Button>
      </section>
    );
  }
}

export default LearningRoute
