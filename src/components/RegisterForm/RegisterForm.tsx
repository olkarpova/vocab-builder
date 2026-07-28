import { Formik, Form, type FormikHelpers } from 'formik';
import css from './RegisterForm.module.css';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { register } from '../../redux/auth/authOperations';
import { Link } from 'react-router-dom';
import FormField from '../FormField/FormField';
import toast from 'react-hot-toast';

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
      toast.success("Registration successful!");
      navigate('/dictionary');
    } catch(error) {
      toast.error(error as string);
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
          <p className={css.info}>
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </p>

          <FormField name="name" type="text" placeholder="Name" />
          <FormField name="email" type="email" placeholder="Email" />
          <FormField name="password" type="password" placeholder="Password" />
        </fieldset>

        <button className={css.btn} type="submit">
          Register
        </button>

        <Link to="/login" className={css.link}>
          Login
        </Link>
      </Form>
    </Formik>
  );
}
// validationSchema  →  задає правила («email має бути валідним»)
//       ↓
// Formik            →  перевіряє поле, генерує помилку, кладе в стан
//       ↓
// <ErrorMessage>    →  читає стан, показує помилку на екрані
