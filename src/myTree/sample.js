import React, { Component } from 'react'
import MyTree from './myTree'
import { data } from './data/data'
import './asset/_init.scss'

class Sample extends Component {

  state = {
    selected: [1, 2],
    results: []
  }

  render () {
    return (
      <div className='container'>
        <MyTree
          className={''}
          style={{}}
          header="Tree List"
          data={data}
          disabled={[]}
          selected={this.state.selected}
          result={this.state.result}
          activated={[1, 6, 3, 9]}
          onSelected={(selected, results) => this.setState({ selected: selected,results })}
          iconMin={<i className="far fa-minus-square "/>}
          iconPlus={<i className="far fa-plus-square "/>}
          renderItem={(item)=><b onClick={()=> console.log(item)}>{item.title}</b>}
        />

        <button onClick={() => console.log(this.state)} className='btn btn-danger'>report</button>

      </div>
    )
  }
}

export default Sample