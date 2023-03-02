export type Option = {
  key: string;
  value: string;
};

export type DropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
};
