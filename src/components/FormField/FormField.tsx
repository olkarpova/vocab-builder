import { useState } from 'react';
import { useField } from 'formik';
import css from './FormField.module.css';
import errorIcon from '../../assets/icons/error.svg';
import successIcon from '../../assets/icons/success.svg';

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
}

export default function FormField({
  name,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const hasError = meta.touched && meta.error;
  const isSuccess = meta.touched && !meta.error;

  // для пароля перемикаємо тип залежно від "ока"
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={css.wrapper}>
      <div className={css.inputBox}>
        <input
          {...field}
          type={inputType}
          placeholder={placeholder}
          className={`${css.input} ${hasError ? css.inputError : ''} ${
            isSuccess ? css.inputSuccess : ''
          }`}
        />

        {isPassword && (
          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        )}
      </div>

      {hasError && (
        <span className={css.error}>
          <img src={errorIcon} alt="" className={css.messageIcon} />
          {meta.error}
        </span>
      )}

      {isSuccess && (
        <span className={css.success}>
          <img src={successIcon} alt="" className={css.messageIcon} />
          Success
        </span>
      )}
    </div>
  );
}
// useField — дає доступ до одного конкретного поля Formik
//useField  дає все про поле одразу:
// const [field, meta] = useField(name);
// field — пропси для input (value, onChange, onBlur, name) — щоб поле працювало;
//meta — стан поля: meta.error (текст помилки), meta.touched (чи торкались поля).

//За допомогою meta можна визначити стан:

//meta.touched && meta.error → помилка (торкались + є помилка);
//meta.touched && !meta.error → успіх (торкались + помилки немає).
