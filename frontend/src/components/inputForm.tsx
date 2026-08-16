import { useId, useState, type HTMLInputTypeAttribute } from "react";
import "./inputForm.css";
import { usePasswordStrength } from "../utils/passwordEntropy";

const STRENGTH_LABELS = [
  "Muito fraca",
  "Fraca",
  "Média",
  "Forte",
  "Muito forte",
];
const STRENGTH_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#15803d"];

interface InputFormProps {
  name: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  showEntropy?: boolean;
}

function InputForm({
  name,
  type,
  labelText,
  showEntropy,
}: InputFormProps) {
  // Numerico para id
  const useID = useId();

  //
  const [value, setValue] = useState("");

  // Condição
  const _showEntropy = showEntropy && type == "password";

  let score = 0;

  if (_showEntropy) {
    const result = usePasswordStrength(value)
    if (result) {
      score = result.score;
    }
  }

  return (
    <>
      <label
        htmlFor={useID}
        className="label"
        style={_showEntropy ? { justifyContent: "space-between" } : {}}
      >
        {_showEntropy ? (
          <>
            {labelText}

            <p style={{color: STRENGTH_COLORS[score]}}>{STRENGTH_LABELS[score]}</p>
          </>
        ) : (
          labelText
        )}
      </label>
      <br />
      <input
        id={useID}
        type={type}
        name={name}
        className="input"
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
    </>
  );
}



export default InputForm;
