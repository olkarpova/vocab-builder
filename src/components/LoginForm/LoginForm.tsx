import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import css from './RegisterForm.module.css';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { register } from '../../redux/auth/authOperations';
import { Link } from 'react-router-dom';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must be 7 characters with letters and a number'
    )
    .required('Password is required'),
});

export default function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
      try {
          await dispatch(register(values)).unwrap();
          actions.resetForm();
          navigate("/dictionary");
      } catch {
          // помилку покажемо через toast
      }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Register</legend>
        <p>Please enter your login details to continue using our service:</p>
          <Field
            className={css.field}
            type="text"
            name="name"
            placeholder="Name"
          />
          <ErrorMessage
            name="name"
            component="span"
            className={css.error}
          />

          <Field
            className={css.field}
            type="email"
            name="email"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="span" className={css.error} />

          <Field
            className={css.field}
            type="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </fieldset>

        <button className={css.btn} type="submit">
          Register
        </button>
        
          <Link to="/login" className={css.link}>Login</Link>
      
      </Form>
    </Formik>
  );
}
