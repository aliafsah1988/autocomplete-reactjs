import IOption from "./IOption"

export default interface IAutocompleteProps {
  shadow?: boolean,
  className?: string,
  placeholder?: string,
  onSelect?: Function,
  onKeyDown?: any,
  asyncCallback?: Function,
  callback?: Function,
  onBlur?: Function,
  size?: string,
  indicatorIcon?: any,
  defaultValue?: IOption,
  indicatorColor?: string,
  activeColor?: string,
}