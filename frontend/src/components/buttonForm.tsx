import './buttonForm.css'
interface ButtonFormProps{
  id: string,
  value: string
}

function ButtonForm({ id, value }: ButtonFormProps) {
  return (
    <input id={id} type='submit' value={value} />
  );

}
  export default ButtonForm;
