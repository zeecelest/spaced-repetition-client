import React, { Component } from 'react'
import WordContext from '../../contexts/wordContext'
import { Input, Label } from '../Form/Form'

class LearningRoute extends Component {

  static contextType = WordContext;

  state = { error: null }

  class _Node { 
    constructor(value) {
      this.value = value;
      this.next = null; 
      this.prev = null;
    }
  }
    class Queue { 
      constructor() {
        this.first = null;
        this.last = null;
      }

      enqueue(data) {
        const node = new Node(data);
        if(this.first === null) {
          this.first = node;
        }
        if(this.last) {
          node.prev = this.last;
          this.last.next = node;
        }
        this.last = node;
      }
      dequeue() {
        if(this.first === null) {
          return;
        }
        const node = this.first;
        this.first = node.next;
        if(node === this.last) {
          this.last = null;
        }
        return node.value;
      }
    }

  renderWord() {
    const { word = [] } = this.context;
    return 
  }


  render() {
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
        <Button type='submit'>
          Submit Answer
        </Button> 
      </section>
    );
  }
}

export default LearningRoute
