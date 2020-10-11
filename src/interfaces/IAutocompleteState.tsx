import IOption from "./IOption"

export default interface IState {
  showOptions: boolean,
  selected?: IOption,
  inputValue: string,
  active: number
}