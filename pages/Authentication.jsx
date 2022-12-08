import { useState, useEffect } from "react";
import Head from "next/head";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Loader from "../components/Loader";
import {
  container,
  heading,
  memberShip,
  errCls,
} from "../styles/Authentication.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { register, login, reset } from "../features/auth/authSlice";
import { isEmail, isStrongPassword } from "validator";

export default function Authentication() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    pass2: "",
  });
  const [formDataErr, setFormDataErr] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    pass2Err: "",
  });
  const { username, email, password, pass2 } = formData;
  const { usernameErr, emailErr, passwordErr, pass2Err } = formDataErr;
  const [isFormValid, setIsFromValid] = useState(false);
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const [isMember, setIsMember] = useState(false);
  const router = useRouter();

  const handleValidation = (id) => {
    if (id === "username") {
      if (username.length < 3)
        setFormDataErr((state) => ({
          ...state,
          usernameErr: "حساب کابری باید حداقل 3 حرف باشد.",
        }));
      else if (username.length > 250)
        setFormDataErr((state) => ({
          ...state,
          usernameErr: "حساب کاربری نمیتواند بیشتر از 250 حرف باشد.",
        }));
      else
        setFormDataErr((state) => ({
          ...state,
          usernameErr: "",
        }));
    }
    if (id === "email") {
      if (!isEmail(email))
        setFormDataErr((state) => ({
          ...state,
          emailErr: "ایمیل آدرس اشتباه است.",
        }));
      else if (email.length > 250)
        setFormDataErr((state) => ({
          ...state,
          emailErr: "ایمیل آدرس نمیتواند بیشتر از 250 حرف باشد.",
        }));
      else
        setFormDataErr((state) => ({
          ...state,
          emailErr: "",
        }));
    }
    if (id === "password") {
      if (password.length > 250)
        setFormDataErr((state) => ({
          ...state,
          passwordErr: "گذرواژه نمیتواند بیشتر از 250 حرف باشد.",
        }));
      else if (
        !isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
        })
      )
        setFormDataErr((state) => ({
          ...state,
          passwordErr:
            "گذرواژه باید حداقل با یک عدد، یک سمبول، یک حرف بزرگ و یک حرف کوچک لاتین، 8 حرف باشد.",
        }));
      else
        setFormDataErr((state) => ({
          ...state,
          passwordErr: "",
        }));
    }

    if (id === "pass2") {
      if (password != pass2)
        setFormDataErr((state) => ({
          ...state,
          pass2Err: "گذرواژه ها شباهت ندارند.",
        }));
      else
        setFormDataErr((state) => ({
          ...state,
          pass2Err: "",
        }));
      if (isMember) setIsFromValid(email && password);
      else setIsFromValid(username && email && password && pass2);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleValidation(e.target.id);
  };

  const handleIsMember = () => {
    setIsMember(!isMember);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const { username, email, password } = formData;
    isMember
      ? dispatch(login({ email, password }))
      : dispatch(register({ username, email, password }));
  };

  useEffect(() => {
    if (user?.hasOwnProperty("email")) {
      dispatch(reset());
      router.push("/");
    }
  }, [user, isLoading, isError, message, router, dispatch]);

  return (
    <>
      <Head>
        <title>ترند - حساب کاربری</title>
      </Head>
      {isLoading && <Loader />}
      <Navbar />
      <main className={container}>
        <h1 className={heading}>
          {isMember ? "ورود به حساب کاربری" : "ساختن حساب کاربری"}
        </h1>
        <form onSubmit={handleSubmit}>
          {!isMember && (
            <>
              <Input
                type="text"
                id="username"
                value={username}
                placeholder="حساب کاربری"
                handleChange={handleChange}
              />
              {usernameErr && <p className={errCls}>{usernameErr}</p>}
            </>
          )}
          <Input
            type="email"
            id="email"
            value={email}
            placeholder="ایمیل آدرس"
            handleChange={handleChange}
          />
          {emailErr && <p className={errCls}>{emailErr}</p>}
          <Input
            type="password"
            id="password"
            value={password}
            placeholder="گذرواژه"
            handleChange={handleChange}
          />
          {passwordErr && <p className={errCls}>{passwordErr}</p>}
          {!isMember && (
            <>
              <Input
                type="password"
                id="pass2"
                value={pass2}
                placeholder="تکرار گذرواژه"
                handleChange={handleChange}
              />
              {pass2Err && <p className={errCls}>{pass2Err}</p>}
            </>
          )}
          <Button type="submit" cls="btnBlue">
            {isMember ? "ورود به حساب" : "ساختن و ورود به حساب"}
          </Button>
        </form>
        <p className={memberShip} onClick={handleIsMember}>
          {isMember ? "حساب کاربری ندارید؟" : "حساب کاربری دارید؟"}
        </p>
      </main>
    </>
  );
}
