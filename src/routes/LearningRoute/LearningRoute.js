import React, { Component } from 'react'
import WordContext from '../../contexts/wordContext'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'


class LearningRoute extends Component {

  static contextType = WordContext;

 

  renderWord() {
    const { word = [] } = this.context;
    return 
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
