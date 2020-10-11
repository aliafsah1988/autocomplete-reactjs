import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "../src/component";

class StoryComp extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      options : [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
      ],
      isLoading: false,
      defaultValue: this.props.defaultValue
    }
  }

  async wait(ms) {
    // mocking an API call
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async onChange(value) {
    if(!value || value.length < 1) {
      this.setState({ options: [], isLoading: false, defaultValue: null });
      return
    }
    this.setState({ options: [], isLoading: true, defaultValue: null });

    await this.wait(3000);

    this.setState({ options: [
        { value: "pink-floyd", label: "Pink Floyd" },
        { value: "led-zeppelin", label: "Led Zeppelin" },
        { value: "hendrix", label: "The Jimi Hendrix Experience" }
      ],
      isLoading: false
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
        icon={"icon-twitter"}
        indicatorIcon={"icon-search"}
        onSelect={this.onSelect.bind(this)}
        onChange= {this.onChange.bind(this)}
        onBlur = {this.onBlur.bind(this)}
        options= {this.state.options}
        isLoading={this.state.isLoading}
        defaultValue= {this.state.defaultValue}
        className = {this.props.className}
        size = {this.props.size}
        shadow = {this.props.shadow}
      />)
  }
}

storiesOf("Components/Autocomplete", module)
  .add("Default", () => 
  {
    return <StoryComp 
      className = {'hero-autocomplete'}
      placeholder = {'Best Bands'}
    />
  })
  .add("Search Page", () => 
  {
    return <StoryComp 
      className = {'search-page-autocomplete'}
      placeholder = {'Where do you want to buy?'}
    />
  })
  .add("Default value", () => 
  {
    return <StoryComp 
      className = {'search-page-autocomplete'}
      placeholder = {'Where do you want to buy?'}
      defaultValue = {{ value: "strawberry", label: "Strawberry" }}
    />
  })
  .add("Small", () => 
  {
    return <StoryComp 
      className = {'hero-autocomplete'}
      size="small"
      placeholder = {'Best Bands'}
    />
  })
  .add("No Shadow", () => 
  {
    return <StoryComp 
      className = {'hero-autocomplete'}
      shadow={false}
      placeholder = {'Best Bands'}
    />
  });