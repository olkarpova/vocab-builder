import { Formik, Form, type FormikHelpers } from 'formik';
import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { logIn } from '../../redux/auth/authOperations';
import toast from 'react-hot-toast';
import FormField from '../FormField/FormField';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginFormSchema = Yup.object().shape({
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

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await dispatch(logIn(values)).unwrap();
      actions.resetForm();
      toast.success('Welcome back!');
      navigate('/dictionary');
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Login</legend>
          <p className={css.info}>Please enter your login details to continue using our service:</p>

          <FormField name="email" type="email" placeholder="Email" />
          <FormField name="password" type="password" placeholder="Password" />
        </fieldset>

        <button className={css.btn} type="submit">
          Login
        </button>

        <Link to="/register" className={css.link}>
          Register
        </Link>
      </Form>
    </Formik>
  );
}
