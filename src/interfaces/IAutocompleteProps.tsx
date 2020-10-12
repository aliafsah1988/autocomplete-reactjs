import IOption from "./IOption"

export default interface IAutocompleteProps {
  shadow?: boolean,
  className?: string,
  placeholder?: string,
  onSelect?: Function,
  onKeyDown?: any,
  onChange?: Function,
  onBlur?: Function,
  size?: string,
  indicatorIcon?: any,
  options?: Array<any>,
  isLoading?: boolean,
  defaultValue?: IOption,
  indicatorColor?: string
}