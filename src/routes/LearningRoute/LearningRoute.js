import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import config from '../../config'
import TokenService from '../../services/token-service'



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
      userInput: '',
      answer: ''
    }
  }

  static contextType = UserContext;

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
  const userInput = event.target['user-input'].value;
  console.log(userInput, 'this check')
  fetch(`${config.API_ENDPOINT}/language/userInput`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({userInput})
  }).then(res => {
      if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
      }
      return res.json();
  })
      .then(res => {
          console.log(res,'gettingg res in client');
          this.setState({
              answer: res.answer, userInput, score: res.score, isCorrect: res.isCorrect,
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


handleInput(event) {
this.setState({userInput: event.target.value})
}

  render() {
    // console.log('here'); 

    return (
      <section className='learn'>
        <p>Score: {this.state.score}</p>
        <p>Amount of times you answered correctly: {this.state.correctAns}</p>
        <p>Amount of times you answered incorrectly:  {this.state.incorrectAns}</p>
      <div className="result">
        <h2>{(this.state.isCorrect !== null) ? (this.state.isCorrect) ? 'Correct!'
            :'Incorrect..'
            :'Translate the word:'}</h2>
          <h3>{this.state.current}</h3>
      </div>
        {(this.state.isCorrect !== null) ? 
        <div className='result'>
          <p>
            Sorry! {this.state.userInput} is incorrect! {this.state.answer} is the translation of {this.state.current}
          </p>
        </div> : ''}
        <form className='submit' onSubmit={this.handleSubmit}>
          {(this.state.isCorrect === null) ? <>
          <div className='input'> 
            <Label htmlFor='user-input'> 
              What is the translation?:
            </Label> 
            <Input 
              id='user-input'
              name='user-input'
              required
              onChange={(event) => this.handleInput(event)} 
              value={this.state.userInput}
            />
          </div> 
          <Button type='submit'>Submit Answer</Button>
          </> : <Button type='submit'>Next Word!</Button>
          }
        </form>
      </section>
    );
  }
}

export default LearningRoute
