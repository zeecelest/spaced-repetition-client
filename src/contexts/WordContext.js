import React, { Component } from 'react'

 const WordContext = React.createContext({ 
  word: [],
  error: null, 
  setError: () => {},
  clearError: () => {},
  setWord: () => {},
  correctTotal: () => {},
  incorrectTotal: () => {},
})

export default WordContext 

export class WordProvider extends Component {
  state = {
    word: [],
    correctCount: null, 
    incorrectCount: null, 
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({error})
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setWord = word => {
    this.setState({word})
  }

  correctWord = correctCount => {
    this.setState({ correctCount})
  }

  incorrectWord = incorrectCount => {
    this.setState({ incorrectCount})
  }

render() {
  const value = { 
    word: this.state.word, 
    error: this.state.error, 
    setError: this.setError, 
    clearError: this.clearError, 
    setWord: this.setWord, 
    correctWord: this.correctWord,
    incorrectWord: this.incorrectWord,
  }
  return (
    <WordContext.Provider value={value}>
      {this.props.children}
    </WordContext.Provider>
    )
  }
}

