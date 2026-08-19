import "./buttonForm.css";
interface ButtonFormProps {
  id: string;
  value: string;
  isLoading?: boolean;
}

function ButtonForm({ id, value, isLoading = false }: ButtonFormProps) {
  return (
    <input
      id={id}
      type="submit"
      value={value}
      className="button-form"
      disabled={isLoading}
      style={ isLoading ? { cursor: 'progress'} : {cursor: 'pointer'}}
    />
  );
}
export default ButtonForm;
