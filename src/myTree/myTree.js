import React, { Component, Fragment } from 'react'

class MyTree extends Component {

  constructor (props) {
    super(props)

    this.state = {
      disabled: props.disabled || [],
      selected: props.selected || [],
      activated: props.activated || [],
      data: this.initialize(props.data, props.disabled || [], props.selected || [], props.activated || []),
      items: [],
      temp: [],

    }
  }

  componentDidMount () {
    console.log('data', this.state)
  }

  initialize = (list = this.props.data, disabled = this.state.disabled, selected = this.state.selected, activated = this.state.activated) => {

    if (list && list[0]) {
      list.map((item) => {

        item.disabled = disabled.indexOf(item.id) > -1
        item.selected = selected.indexOf(item.id) > -1
        item.activation = activated.indexOf(item.id) > -1

        if (item.children) {
          item.children = this.initialize(item.children, disabled, selected, activated)
        }
      })
    }
    return list
  }

  setData=()=>{
    this.setState({ data: this.initialize() }, ()=>this.props.onSelected(this.state.selected))
  }

  /*

  disabled = (list) => {
    const { disabled } = this.props
    return disabled.map((node) => {
      return list.map((item, index) => {
        if (item.id === node) {
          list[index].disabled = true
          this.setState({ data: list })
        }
        if (item.children) {
          this.disabled(item.children)
        }
      })
    })
  }

  selected = (list) => {
    const { selected } = this.props
    return selected.map((node) => {
      return list.map((item, index) => {
        if (item.id === node) {
          list[index].selected = true
          this.setState({ data: list })
        }
        if (item.children) {
          this.selected(item.children)
        }
      })
    })
  }

  activity = () => {
    const { data, activated } = this.props
    activated.map((item_active) => {
      const index = data.findIndex((item) => item.id === item_active)
      if (index > -1) {
        data[index].activation = true
        this.setState({ data: data })
      }
      return data
    })
  }
*/

  changeActivate = (id) => {
    const { activated } = this.state
    const index = activated.indexOf(id)
    if (index > -1) {
      activated.splice(index, 1)
    } else {
      activated.push(id)
    }
    this.setState({ activated }, this.setData)
  }
  changeSelected = (id) => {
    const { selected } = this.state
    const index = selected.indexOf(id)
    if (index > -1) {
      selected.splice(index, 1)
    } else {
      selected.push(id)
    }
    this.setState({ selected }, this.setData)
  }

  /*
  changeSelected = (branch, id) => {
    const { temp } = this.state
    const index = branch.findIndex((item) => item.id === id)
    if (index > -1) {
      branch[index].selected = !branch[index].selected
      this.setState({ temp: branch }, () => this.reportSelected())
    }
    return temp
  }

  _checkSelected = (data) => {
    let seletced = []
    data.forEach((item) => {
      if (item.selected === true) {
        seletced.push(item.id)
      }
      if (item.children) {
        seletced.push(...this._checkSelected(item.children))
      }
    })
    return seletced
  }

  reportSelected = () => {
    const { data } = this.state

    let seletced = this._checkSelected(data)

    this.setState(state => {
      return { items: seletced }
    }, () => {
      this.props.onSelected(seletced)
    })
  }

   */

  showTree = (list, activation) => {
    return (
      <ul className={activation ? 'hide' : 'show'}>
        {list.map((item, key) => {
          return (
              <li key={key} className={item.disabled ? 'disabled ' : null}>
                { item.children && item.children[0] &&
                   <span className='mr-3' onClick={() => this.changeActivate(item.id)}>
                      {!item.activation ? (this.props.iconMin || '-') : (this.props.iconPlus || '+')}
                    </span>
                }
                <input onChange={() => this.changeSelected(item.id)} type="checkbox" checked={item.selected}/>
                <span className='ml-1'>
                  {item.title}
                </span>
                {item.children ? this.showTree(item.children, item.activation) : null}

              </li>
          )
        })}
      </ul>
    )
  }

  render () {
    return (
      <div className='container text-center'>
        <h3 className='text-success'>{this.props.header}</h3>
        {this.showTree(this.state.data)}


      </div>

    )
  }
}

export default MyTree