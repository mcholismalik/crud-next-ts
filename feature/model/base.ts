export interface IOption {
  id: string;
  type: string;
  label: string;
  childs?: IOption[];
}

export interface IOptionForm {
  id: string;
  type: string;
  label: string;
}
