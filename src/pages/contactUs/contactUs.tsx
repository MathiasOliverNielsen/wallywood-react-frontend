import style from "./contactUs.module.scss";
import { Title } from "../../Components/ui/Title/Title";
import { useState } from "react";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className={style.contactUsContainer}>
      <Title text="Kontakt os" />

      <section className={style.contactSection}>
        <form className={style.contactForm} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="name">
              Dit navn: <span className={style.required}>*</span>
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={style.formInput} />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="email">
              Din email: <span className={style.required}>*</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={style.formInput} />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="message">
              Din besked: <span className={style.required}>*</span>
            </label>
            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className={style.formTextarea} />
          </div>

          <button type="submit" className={style.sendButton}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
