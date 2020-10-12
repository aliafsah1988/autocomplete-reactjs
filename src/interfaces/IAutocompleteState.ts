import IOption from "./IOption"

interface IAutocompleteState {
  showOptions: boolean,
  selected?: IOption,
  inputValue: string,
  active: number,
  options?: Array<IOption>,
  isLoading?: boolean,
}

export default IAutocompleteState