import IOption from "./IOption"

export default interface IAutocompleteProps {
  shadow?: boolean,
  className?: string,
  placeholder?: string,
  isClearable?: boolean,
  onSelect?: Function,
  onKeyDown?: any,
  onLoad?: Function,
  onChange?: Function,
  onBlur?: Function,
  size?: string,
  icon?: string,
  indicatorIcon?: string,
  options?: Array<any>,
  isLoading?: boolean,
  defaultValue?: IOption
}