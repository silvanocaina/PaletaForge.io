import type { HTMLInputTypeAttribute } from "react";
import './inputForm.css'

interface InputFormProps {
  id: string,
  name: string,
  type: HTMLInputTypeAttribute
  labelText: string
}

function InputForm({ id, name, type, labelText }: InputFormProps) {
  return (<>
    <label htmlFor={id} className="label">
    {labelText}
    </label>
      <br/>
    <input type={type} name={name} className="input" />
    <br/>
  </>)
}

export default InputForm;
