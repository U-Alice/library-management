import {Input} from '@mantine/core';

export default function Wrapper({label, icon, placeholder, name, value, handleChange, required}){
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {icon}
          <p className="text-sm font-normal text-darkb">{label}</p>
        </div>

        <input
          required={required}
          name={name}
          value={value}
          type="text"
          className="border-[0.07em] border-[#CECECE] rounded-md focus:outline-none px-4 py-2 placeholder:opacity-50 text-sm font-"
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
}