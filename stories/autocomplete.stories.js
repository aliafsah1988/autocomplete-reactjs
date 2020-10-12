import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "../src/component/Autocomplete";

class StoryComp extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      defaultValue: this.props.defaultValue
    }
  }

  async wait() {
    this.setState({ defaultValue: null });
    // mocking an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { value: "pink-floyd", label: "Pink Floyd" },
          { value: "led-zeppelin", label: "Led Zeppelin" },
          { value: "hendrix", label: "The Jimi Hendrix Experience" }
        ])
      }, 3000);
    });
  }

  onSelect(value) {
    this.setState({ defaultValue: value});
  }

  async onBlur() {
    if((!this.state.defaultValue || this.state.defaultValue.label.length < 1)  && this.state.options && this.state.options.length > 0)
      this.setState({ defaultValue: this.state.options[0]});
  }

  render() {
    return (
      <Autocomplete
        placeholder= {this.props.placeholder}
        indicatorIcon={
          <img className="icon-search"
            src={require("../src/assets/search.svg") }>
          </img>
        }
        indicatorIcon={
          <img className="icon-close"
            src={require("../src/assets/close.svg") }>
          </img>
        }
        onSelect={this.onSelect.bind(this)}
        asyncCallback= {this.wait.bind(this)}
        onBlur = {this.onBlur.bind(this)}
        defaultValue= {this.state.defaultValue}
        className={this.props.className}
        size={this.props.size}
        shadow={this.props.shadow}
        indicatorColor="#DEE6E9"
        activeColor= "#EFF7FA"
      />
    )
  }
}

storiesOf("Components/Autocomplete", module)
  .add("Default", () => 
  {
    return <StoryComp 
      className = {'default-autocomplete'}
      placeholder = {'Best Bands'}
    />
  })
  .add("Radius", () => 
  {
    return <StoryComp 
      className = {'radius-autocomplete'}
      placeholder = {'Which one is the best band ever?'}
    />
  })
  .add("Default value", () => 
  {
    return <StoryComp 
      className = {'radius-autocomplete'}
      placeholder = {'Which one is the best band ever?'}
      defaultValue = {{ value: "pink-floyd", label: "Pink Floyd" }}
    />
  })
  .add("Small", () => 
  {
    return <StoryComp 
      className = {'default-autocomplete'}
      size="small"
      placeholder = {'Best Bands'}
    />
  })
  .add("No Shadow", () => 
  {
    return <StoryComp 
      className = {'default-autocomplete'}
      shadow={false}
      placeholder = {'Best Bands'}
    />
  });
