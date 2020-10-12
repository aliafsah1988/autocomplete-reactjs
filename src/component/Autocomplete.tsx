// Libraries
import * as React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

// Style
import './style.styl';

// Interfaces & Classes
import IAutocompleteProps from "../interfaces/IAutocompleteProps";
import IAutocompleteState from "../interfaces/IAutocompleteState"
import IOption from "../interfaces/IOption";
import Option from "../classes/option";

export default class Autocomplete extends React.Component<IAutocompleteProps, IAutocompleteState> {
  state = {
    showOptions: false,
    selected: new Option('', ''),
    inputValue: '', // not binded to input directly
    active: -1,
    options: new Array<IOption>(),
    isLoading: false
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

  async handleChange(event: any) {
    const newValue = event.target.value

    if(!newValue || newValue.length < 1) {
      this.setState({ options: [], isLoading: false });
      return
    }

    this.setState({
      showOptions: true,
      inputValue: newValue,
      selected: new Option('', ''),
      options: [],
      isLoading: true
    });
    
    let options = new Array<IOption>();
    if(this.props.asyncCallback)
      options = await this.props.asyncCallback();
    else if(this.props.callback)
      options = this.props.callback();

    this.setState({ options: options,
      isLoading: false
    });
  }
  
  handleKeyDown(event: any) {
    // Escape
    if(event.keyCode === 27) {
      this.handleClose();
      return;
    }
    // Enter
    if(event.keyCode == 13 && this.state.options && this.state.options.length > 0) {
      let selectedIndex = this.getSelectedOptionIndex();
      this.handleSelect(this.state.options[selectedIndex]);
      return;
    }

    if(event.keyCode == 40 && this.state.options && this.state.options.length > 0) {
      if(this.state.active < this.state.options.length - 1) {
        this.setState({ active: this.state.active + 1});
      }
      return;
    }

    if(event.keyCode == 38 && this.state.options && this.state.options.length > 0) {
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
    if(this.state.active > -1 && this.state.active < this.state.options.length)
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
      indicatorColor,
      indicatorIcon,
      activeColor,
      closeIcon
    } = this.props;

    const {
      options,
      isLoading
    } = this.state;

    const optionComponents = options && options.length > 0 && options.map((option: IOption, index: number) => {
      const style = this.state.active === index ? {background: activeColor} : {background: 'white'};
      
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
            { 
              closeIcon ? closeIcon : 
              <img className="icon-close"
                src={require("../assets/close.svg") }>
              </img>
            }
            </div> 
          : null}
          
          <div className="autocomplete__icon form-select__text--indicator medium"
            style={ { backgroundColor: indicatorColor } }
            onClick={() => this.handleIndicatorIconClick()}>
            { 
              indicatorIcon ? indicatorIcon : 
              <img className="icon-search"
                src={require("../assets/search.svg") }>
              </img>
            }
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
