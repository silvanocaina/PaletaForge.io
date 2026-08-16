import { useId, useState, type HTMLInputTypeAttribute } from "react";
import "./inputForm.css";
import { usePasswordStrength } from "../utils/passwordEntropy";
import type {  ZodString } from "zod";

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
  rules?: ZodString;
  showEntropy?: boolean;
}

function InputForm({
  name,
  type,
  labelText,
  rules,
  showEntropy,
}: InputFormProps) {
  // Numerico para id
  const useID = useId();

  // Estado do valor
  const [value, setValue] = useState("");

  // Condição
  const _showEntropy = showEntropy && type == "password";


  let score = 0;

  if (_showEntropy) {
    const result = usePasswordStrength(value);
    if (result) {
      score = result.score;
    }
  }

  let rules_error:string|null = null;

  if (rules) {
    const parseResult = rules.safeParse(value);

    if (!parseResult.success) {
      rules_error = parseResult.error.issues[0].message;
    }
  }
  const showedInformation: boolean = (_showEntropy || rules_error);

  return (
    <>
      <label
        htmlFor={useID}
        className="label"
        style={showedInformation ? { justifyContent: "space-between" } : {}}
      >
        {
          // Analisa se a uma informação para mostrar
          (showedInformation) && value.length > 0 ? (
            <>
              {labelText}
              {
                // Prioriza o erro de regra ao inves de mostrar a força da entropia
                rules_error ? (
                  <p style={{ color: STRENGTH_COLORS[0] }}>{rules_error}</p>
                ) : (
                  <p style={{ color: STRENGTH_COLORS[score] }}>
                    {STRENGTH_LABELS[score]}
                  </p>
                )
              }
            </>
          ) : (
            labelText
          )
        }
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
