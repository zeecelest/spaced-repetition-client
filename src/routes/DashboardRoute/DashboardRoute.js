import React, { Component } from 'react'
import WordContext from '../../contexts/WordContext'
import WordListApiService from '../../services/WordListApiService'
import { Link } from 'react-router-dom'

 class DashboardRoute extends Component {
  static contextType = WordContext;

  componentDidMount() {
    console.log(this.context)
    this.context.clearError()
    // get words needs language id 
    WordListApiService.getWords()
      // .then(console.log)
      .then((obj) => this.context.setWordList(obj.words))
      .catch(this.context.setError)
  }

  renderWords() {
    // console.log(this.context)
    const { word = [] } = this.context;
    // console.log(word);

    return word.map( word => 
      <h3>{word.id}. {word.original} = {word.translation}</h3> 
    )
  }

  render() {
    const { error } = this.context
    return (
      <section>
        <h2>
          Language: French 
        </h2> 
        <h3>Words to practice:</h3>
        {error 
          ? <p className='red'>There was an error, try again</p>
          : this.renderWords()}

        <Link to="/learn"><button className='start' type='submit'>Start Practice!</button></Link> 
      </section>
    );
  }
}

export default DashboardRoute
