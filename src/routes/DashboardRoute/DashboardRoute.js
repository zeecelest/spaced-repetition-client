import React, { Component } from 'react'
import WordContext from '../../contexts/WordContext'
import WordListApiService from '../../services/WordListApiService'

 class DashboardRoute extends Component {
  static contextType = WordContext

  componentDidMount() {
    this.context.clearError()
    WordListApiService.getWords()
      .then(this.context.setWordList)
      .catch(this.context.setError)
  }

  renderWords() {
    console.log(this.context)
    const { word = [] } = this.context

; 
    return word.map( word => 
      <h3>{word.id}: {word}</h3> 
    )
  }

  render() {
    const { error } = this.context
    return (
      <section>
        {error 
          ? <p className='red'>There was an error, try again</p>
          : this.renderWords()}
        <h2>
          Language: French 
        </h2> 
        <button className='start' type='submit'>Start Practice!</button> 
        <h3>Words to practice:</h3>
        <ol>
          <li>{this.word}</li>
        </ol>
      </section>
    );
  }
}

export default DashboardRoute
