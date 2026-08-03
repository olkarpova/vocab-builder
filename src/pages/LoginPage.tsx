import LoginForm from "../components/LoginForm/LoginForm";
import illustration from '../assets/illustration.png';
import css from "./LoginPage.module.css"
// import { logOut } from "../redux/auth/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../redux/store";

export default function LoginPage() {
    return (
      <section className={css.wrapper}>
      <LoginForm />

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

// export default function LoginPage() {
//     const dispatch = useDispatch();
//     const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
//     const handleTestLogin = () => {
//          dispatch(
//             setCredentials({
//                 user: { name: "Test User", email: "test@test.com" },
//                 token: "fake-token-123",
//             })
//         );
//     };
    
//     return (
//         <div>
//             <h1>Login</h1>
//             <p>Статус: {isLoggedIn ? `Залогінений як ${user?.name}` : "Не залогінений"}</p>
//             <button onClick={handleTestLogin}>Тест: залогінити</button>
//             <button onClick={() => dispatch(logOut())}>Тест: вийти</button>
//         </div>
//     );
// }
// useSelector — «прочитати» щось зі store
//useDispatch - отримати функцію, якою запускають зміни
// RootState - тип усього стану
// setCredentials({...}) — створює action-об'єкт. 
    // Те, що всередині дужок, стає action.payload у reducer
// функція dispatch - Через неї відправлятимемо дії у store
// об'єкт { user: {...}, token: "..." } — це і є payload, який reducer «розбирає»
// user?.name - ? - знак питання це опціональний ланцюжок: якщо user = null, 
    // не падає з помилкою, а просто дає undefined. Страховка, 
    // бо на старті user справді null