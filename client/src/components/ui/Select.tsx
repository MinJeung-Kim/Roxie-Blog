import { FormEvent } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";

type Props = {
  value: string;
  options: string[];
  onChange: (e: FormEvent<HTMLLIElement>, value: string) => void;
};

export default function Select({ value, options, onChange }: Props) {
  return (
    <button
      type="button"
      className="relative flex items-center justify-center text-gray-600 border border-[#d0d7de] rounded-sm focus:outline-none focus:ring-1 ring-gray-200 group"
    >
      <span className="px-4 text-sm">{value}</span>
      <span className="px-2 border-l hover:bg-gray-100">
        <ArrowDownIcon className="w-4 h-4" />
      </span>
      <div className="absolute z-10 hidden min-w-full mt-1 bg-white rounded-sm group-focus:block top-full w-max">
        <ul className="text-left border border-[#d0d7de] rounded">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-1 text-sm border-b hover:bg-gray-100"
              onClick={(e) => onChange(e, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
