// Libraries
import * as React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

// Style
import './style.styl';

// Interfaces
import IAutocompleteProps from "../interfaces/IAutocompleteProps";
import IAutocompleteState from "../interfaces/IAutocompleteState"
import IOption from "../interfaces/IOption";

class Option implements IOption {
  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
  public value = '';
  public label = '';
}

export default class Autocomplete extends React.Component<IAutocompleteProps, IAutocompleteState> {
  state = {
    showOptions: false,
    selected: new Option('', ''),
    inputValue: '', // not binded to input directly
    active: -1
  }

  constructor(props: IAutocompleteProps) {
    super(props);
  }

  handleSelect(option: IOption) {
    this.setState({ showOptions: false, selected: option, active: -1 });
    if(document)
      (document.getElementById('input-text') as HTMLInputElement).value = option.label;
    this.props.onSelect(option);
  }


  handleClose() {
    this.setState({ showOptions: false, selected: new Option('', ''), active: -1 });
    if(document)
      (document.getElementById('input-text') as HTMLInputElement).value = '';
    this.props.onSelect();
  }

  handleChange(event: any) {
    const newValue = event.target.value
    this.setState({
      showOptions: true,
      inputValue: newValue,
      selected: new Option('', '')
    });
    this.props.onChange(newValue);
  }
  
  handleKeyDown(event: any) {
    // Escape
    if(event.keyCode === 27) {
      this.handleClose();
      return;
    }
    // Enter
    if(event.keyCode == 13 && this.props.options && this.props.options.length > 0) {
      let selectedIndex = this.getSelectedOptionIndex();
      this.handleSelect(this.props.options[selectedIndex]);
      return;
    }

    if(event.keyCode == 40 && this.props.options && this.props.options.length > 0) {
      if(this.state.active < this.props.options.length - 1) {
        this.setState({ active: this.state.active + 1});
      }
      return;
    }

    if(event.keyCode == 38 && this.props.options && this.props.options.length > 0) {
      if(this.state.active > 0) {
        this.setState({ active: this.state.active - 1});
      }
      return;
    }
  }

  handleIndicatorIconClick() {
    if(this.props.defaultValue) {
      this.handleSelect(this.props.defaultValue);
    }
  }

  handleBlur() {
    setTimeout(() => {
      this.setState({showOptions: false, active: -1});
      if(this.props.onBlur) this.props.onBlur();
    }
    , 200);
  }

  getSelectedOptionIndex() {
    let selectedIndex = 0;
    if(this.state.active > -1 && this.state.active < this.props.options.length)
    selectedIndex = this.state.active;
    return selectedIndex;
  }

  getFontSize(size: string) {
    return size === "small" ? 15 : 18;
  }

  getHeight(size: string) {
    return size === "small" ? 40 : 52;
  }

  static getDerivedStateFromProps(props: IAutocompleteProps, state: any) {
    try {
      if (typeof window === 'undefined')  return;
     
      if(props.defaultValue) {
        const element = (document.getElementById('input-text') as HTMLInputElement);
        if(element) element.value = props.defaultValue.label;
        return { selected: props.defaultValue }
      }
    } catch (error) {
      
    }
    return null;
  }

  render() {
    const { 
      placeholder,
      className,
      size = "medium",
      shadow = true,
      defaultValue,
      isLoading,
      options,
      indicatorColor,
      indicatorIcon
    } = this.props;

    const optionComponents = options && options.length > 0 && options.map((option, index) => {
      const style = this.state.active === index ? {background: ' #EFF7FA'} : {background: 'white'};
      
      return (
        <a className="dropdown-options__item" 
          key={index} 
          onClick={() => this.handleSelect(option)}
          onMouseEnter={() => this.setState({ active: index })}
          style={style}
        >
          {option.label}
        </a>
      )
    })

     return (
      <div 
        className={`autocomplete ${className} ${size} 
        ${!shadow && 'noshadow'}`}
      >
        <div className="form-select__text">
          <input 
            className="form-select--input"
            type='text'
            id= "input-text"
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue.label : ''}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            autoComplete="off"
          />
          
          {isLoading ? 
          <div className="autocomplete__icon form-select__text--loading medium">
            <BeatLoader
              size={8}
              color={"#333333"}
              loading={isLoading}
            />
          </div> : null}
          {this.state.selected && this.state.selected.value && this.state.selected.value.length > 0 ? 
            <div className="autocomplete__icon form-select__text--close medium" onClick={() => this.handleClose()}>
            <i className="icon-close" />
            </div> 
          : null}
          
          <div className="autocomplete__icon form-select__text--indicator medium"
            style={ { backgroundColor: indicatorColor } }
            onClick={() => this.handleIndicatorIconClick()}>
            { indicatorIcon }
          </div>
        </div>
        {(this.state.showOptions && options && options.length > 0 && this.state.inputValue.length > 0) || isLoading ? 
        <div className="dropdown-options">
          { optionComponents }
          {isLoading ? 
            <div className="autocomplete__icon dropdown-options__item--loading medium">
              <span>Loading ...</span>
            </div> 
          : null}
        </div> : null}
      </div>
    )
  }
}
