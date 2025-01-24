import { ChangeEvent, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  initialValue?: string;
  options: string[];
  onSelected: (value: string) => void;
}

const Dropdown = ({ initialValue, options, onSelected }: Props) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [filter, setFilter] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value;
    setFilter(filterText);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (value: string, e: any) => {
    e.stopPropagation();
    setShowOptions(false);
    setSelectedValue(value);
    onSelected(value);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={`dropdown ${
          selectedValue ? "text-gray-900" : "text-gray-400"
        } ${showOptions ? "dropdown-active" : ""}
        }`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div>{selectedValue ? selectedValue : "Select"}</div>
        {selectedValue && (
          <div
            className="mr-1 hover:scale-105"
            onClick={(event) => {
              handleSelect("", event);
            }}
          >
            <CloseIcon />
          </div>
        )}
      </div>

      {showOptions && (
        <div className="absolute left-0 right-0 -bottom-2 translate-y-full z-10 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="border border-b-gray-300">
            <input
              className="w-full p-2 "
              type="text"
              value={filter}
              onChange={handleFilterOnChange}
              placeholder="Search..."
            />
          </div>

          <ul className="max-h-96 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-slate-100 cursor-pointer ${
                  option === selectedValue ? "bg-slate-100" : ""
                }`}
                onClick={(event) => {
                  handleSelect(option, event);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
