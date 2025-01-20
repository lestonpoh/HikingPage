import { ChangeEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, name, onChange }: Props) => {
  return (
    <div>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
