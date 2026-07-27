import RegisterForm from '../components/RegisterForm/RegisterForm';
import illustration from '../assets/illustration.png';

import css from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <section className={css.wrapper}>
      <RegisterForm />

      <div className={css.illustration}>
        <img
          className={css.image}
          src={illustration}
          srcSet={`${illustration} 2x`}
          alt="Two people reading books"
          width={534}
          height={532}
        />
        <ul className={css.captions}>
          <li>Word</li>
          <li>Translation</li>
          <li>Grammar</li>
          <li>Progress</li>
        </ul>
      </div>
    </section>
  );
}
