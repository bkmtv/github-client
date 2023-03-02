import { useState } from "react";

import { DropdownProps, Option } from "@types";

import styles from "./Dropdown.module.scss";

export function Dropdown({ options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (selectedOption: Option) => {
    onChange(
      value.includes(selectedOption)
        ? value.filter((option) => option !== selectedOption)
        : [...value, selectedOption]
    );
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.selected} onClick={toggleDropdown}></div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.key}
              className={styles.selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
