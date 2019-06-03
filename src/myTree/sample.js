import React, { Component } from 'react'
import MyTree from './myTree'
import { data } from './data/data'
import './asset/_init.scss'

class Sample extends Component {

  state = {
    selected: [3, 4, 7]
  }

  render () {
    return (
      <div className='container'>

        <MyTree
          className={''}
          style={{}}
          header="Tree List"
          data={data}
          disabled={[3,7]}
          selected={this.state.selected}
          activated={[1,6]}
          onSelected={(selected) => this.setState({ selected:selected })}
          iconMin={<i className="far fa-minus-square "/>}
          iconPlus={<i className="far fa-plus-square "/>}
        />

        <button onClick={() => console.log(this.state)} className='btn btn-danger'>report</button>

      </div>
    )
  }
}

export default Sample