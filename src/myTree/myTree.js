import React, { Component } from 'react'

class MyTree extends Component {

  constructor (props) {
    super(props)

    this.state = {
      disabled: props.disabled || [],
      selected: props.selected || [],
      activated: props.activated || [],
      data: this.initialize(props.data, props.disabled || [], props.selected || [], props.activated || []),
      items: [],
      temp: []
    }
  }

  componentDidMount () {
    this.checkItem(this.state.data)

    this.props.onSelected(this.state.selected, this.getObjectSelect())

  }

  checkItem = (data) => {
    const { selected } = this.state
    for (let i = 0; i < data.length; i++) {
      const index = selected.findIndex(selected => selected === data[i].id)
      if (index > -1) {
        this.childAutoCheck(data[i], selected)
      }

    }
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
        return list
      })
    }
    return list
  }

  setData = () => {
    this.setState({ data: this.initialize() }, () => this.props.onSelected(this.state.selected, this.getObjectSelect()))
  }

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

  getObjectSelect = () => {
    const { selected, data } = this.state
    let result = []
    for (let i = 0; i < data.length; i++) {
      const index = selected.findIndex(selected => selected === data[i].id)
      if (index > -1) {
        result.push(data[i])
      }
    }

    return result
  }
  changeSelected = (item) => {

    let { data, selected } = this.state

    this.toggleItemSelect(item, selected)

    this.childAutoCheck(item, selected)

    this.parentAutoCheck(data, item)

    this.setState({ selected }, this.setData)
  }

  toggleItemSelect = (item, selected) => {
    const index = selected.indexOf(item.id)
    if (index > -1) {
      selected.splice(item.id,1)
    } else {
      selected.push(item.id)
    }
    return selected
  }
  checkAllChild = (item, selected) => {

    const index = selected.indexOf(item.id)
    if (index === -1) {
      selected.push(item.id)
    }
    return selected
  }
  uncheckAllChild = (item, selected) => {
    const index = selected.indexOf(item.id)
    if (index > -1) {
      selected.splice(item.id, 1)
    }
    return selected
  }

  childAutoCheck = (item, selected) => {
    if (item.children) {
      item.children.map((_item) => {
        const index = selected.findIndex(selected => selected === item.id)
        if (index > -1) {
          this.checkAllChild(_item, selected)
          this.childAutoCheck(_item,selected)
        } else if(index===-1) {
          this.uncheckAllChild(_item, selected)
          this.childAutoCheck(_item,selected)
        }

      })
    }
  }

  parentAutoCheck = (source, item) => {
    const { selected } = this.state
    let check = true
    let parent = this.findParent(source, item)

    if (parent) {

      check = this.checkAllChildSelected(parent)

      if (check) {
        selected.push(parent.id)
      } else {
        selected.splice(parent.id, 1)
      }

      if (parent.children && parent.children[0] && parent.children[0].id)
        this.parentAutoCheck(parent.children, item)
    }
    return selected
  }

  findParent = (source, item) => {
    for (let i = 0; i < source.length; i++) {
      const index = source[i].children.findIndex(child => child.id === item.id)
      if (index > -1) {
        return source[i]
      }
      this.parentAutoCheck(source[i].children, item)
    }
  }

  checkAllChildSelected = (parent) => {

    const { selected } = this.state
    if (parent.children) {
      let check = true
      for (let i = 0; i < parent.children.length; i++) {
        const index = selected.findIndex(selected => selected === parent.children[i].id)
        if (index === -1) {
          check = false
          break
        }
      }
      return check
    }
  }
  renderItem = (item) => {
    return item
  }

  showTree = (list, activation) => {
    return (
      <ul className={activation ? 'hide' : 'show'}>
        {list.map((item, key) => {
          return (
            <li key={key} className={item.disabled ? 'disabled ' : null}>
              {item.children && item.children[0] ?
                <span className='mr-3' onClick={() => this.changeActivate(item.id)}>
                      {!item.activation ? (this.props.iconMin || '-') : (this.props.iconPlus || '+')}
                    </span> : <span className='mr-3' style={{ color: '#fff' }}>**</span>
              }
              <input onChange={() => this.changeSelected(item)} type="checkbox" checked={item.selected}/>
              <span className='ml-1'>
                 {this.props.renderItem(item)}
                </span>
              {item.children ? this.showTree(item.children, item.activation) : null}

            </li>
          )
        })}
      </ul>
    )
  }

  render () {
    console.log(this.state.selected)
    // console.log(this.state.selected)
    return (
      <div className='container text-center'>
        <h3 className='text-success'>{this.props.header}</h3>

        {this.showTree(this.state.data)}

      </div>

    )
  }
}

export default MyTree