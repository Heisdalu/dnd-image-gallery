import { FC, ChangeEventHandler, FocusEventHandler } from "react";

interface InputFormProps {
  label: string;
  title: string;
  inputType: string;
  inputValue: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  touched: boolean | undefined;
  error: string | undefined;
}

const InputForm: FC<InputFormProps> = ({
  label,
  title,
  inputType,
  inputValue,
  handleChange,
  handleBlur,
  touched,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="capitalize mb-[5px]">
        {title}
      </label>
      <input
        type={inputType}
        className={`border-1 p-0.5 rounded-[12px] ${
          touched && error && "border-[#ff0000]"
        }`}
        name={label}
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputValue}
      />
      {touched && error && (
        <div className={`pl-[5px] text-[0.7rem] mt-[3px] text-[#ff0000]`}>
         {error}
        </div>
      )}
    </div>
  );
};
export default InputForm;
