import { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="text-sm placeholder:text-sm w-full h-8 px-3 py-1 border border-[#d0d7de] rounded-sm"
      onChange={onChange}
    />
  );
}
