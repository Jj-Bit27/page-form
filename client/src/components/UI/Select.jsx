import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export function Select({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button"
        className={`
          relative w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <FaChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900
                ${
                  option.value === value
                    ? "bg-purple-100 text-purple-900"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span
                className={`block truncate ${
                  option.value === value ? "font-medium" : "font-normal"
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
