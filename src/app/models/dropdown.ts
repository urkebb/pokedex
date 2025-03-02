export interface Option<T extends string = string> {
  label: string;
  value: T;
  isSelected: boolean;
}
