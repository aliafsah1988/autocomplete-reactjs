import IOption from "../interfaces/IOption";

class Option implements IOption {
  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
  public value = '';
  public label = '';
}

export default Option