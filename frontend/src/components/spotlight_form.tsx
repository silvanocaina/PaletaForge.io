import { useRef, type SubmitEventHandler } from 'react';
import './spotlight_form.css'

interface SpotlightFormProps extends React.ComponentProps<'form'>{
  children?: React.ReactNode;
  width: number | string,
  height: number | string,
  submit: (e: React.SubmitEvent, ref: React.RefObject<any>) => void
}

function SpotlightForm({  width = 300, height = 300, children, submit }: SpotlightFormProps) {

  const formRef = useRef(null);

  const submitEvent: SubmitEventHandler = async (e) => {
     submit(e,formRef);
}

  const handleMouseMove = (e) => {
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    formRef.current.style.setProperty("--x", `${x}px`);
    formRef.current.style.setProperty("--y", `${y}px`);
  }
    return (
      <form ref={formRef} onMouseMove={handleMouseMove} onSubmit={submitEvent} className="spotlight-form" style={{width, height}}>
        {children}
      </form>
    )

}

export default SpotlightForm;
