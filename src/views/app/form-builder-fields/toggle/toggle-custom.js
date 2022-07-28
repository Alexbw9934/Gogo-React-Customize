import React,{Component} from 'react'

export default class ToggleCustomComp extends Component {

    constructor(props) {
      super(props)
const {value} =this.props
   
this.state = {
        value1: value
      };
    }
  
    setValue = () => {
        const {onChange} =this.props
        const {value1} =this.state
      this.setState(
        prevState => ({ value1: !prevState.value1 }),
        () => onChange(null, value1)
      );
    };
  
    render() {
      return (
        <label htmlFor='checkbox' className="switch">
          <input type="checkbox" onClick={this.setValue} />
          <span className="slider round" />
        </label>
      );
    }
  };