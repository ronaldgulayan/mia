import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  AccountInformationContext,
  LoadingContext,
  RegistrationAlertBoxContext,
  SigninPopupContext,
} from "../context/CustomContext";
import CustomLink from "../toolbox/CustomLink";
import EmailField from "../toolbox/EmailField";
import PasswordField from "../toolbox/PasswordField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import useCookies from "../hooks/useCookies";
import { getGlobalUrl } from "../functions/methods";

function SigninPopup() {
  const visibilityContext = useContext(SigninPopupContext);
  const popupContext = useContext(RegistrationAlertBoxContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const popupRef = useRef();
  const backgroundRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { setCookie } = useCookies("token");
  const navigate = useNavigate();
  const loadingContext = useContext(LoadingContext);

  useEffect(() => {
    if (email && password) {
      if (!email.includes("@gmail.com")) {
        setSubmitBtnDisabled(true);
      } else if (email.split("@")[0].length < 3) {
        setSubmitBtnDisabled(true);
      } else if (password.length <= 5) {
        setSubmitBtnDisabled(true);
      } else {
        setSubmitBtnDisabled(false);
      }
    } else {
      setSubmitBtnDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (visibilityContext.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visibilityContext.value]);

  const popupMessage = (title, message, error = true) => {
    popupContext.setValue((curr) => ({
      ...curr,
      state: true,
      message: message,
      error: error,
      title: title,
    }));
  };

  const { getCookie } = useCookies("token");
  const accountContext = useContext(AccountInformationContext);

  const submitEventHandler = (e) => {
    e.preventDefault();

    if (submitBtnDisabled || isLoading) return;

    const data = { email, password };
    setIsLoading(true);
    axios
      .post(getGlobalUrl("/mia/api/login"), data)
      .then((value) => {
        if (value.data.status === 500) {
          popupMessage(value.data.title, value.data.message);
        } else if (value.data.status === 200) {
          // success
          setCookie(value.data.token);
          visibilityContext.setValue(false);
          loadingContext.setValue((curr) => ({
            state: true,
            label: "Redirecting...",
          }));

          axios
            .get(getGlobalUrl("/mia/api/decode-token/" + getCookie()))
            .then((value) => {
              accountContext.setValue(value.data.data);
            });

          window.setTimeout(() => {
            loadingContext.setValue((curr) => ({
              state: false,
              label: "Success",
            }));

            navigate("/account");
          }, 3000);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        // ERROR
        setIsLoading(false);
        popupMessage(
          "Server Error",
          "The server is currently offline. Please try again later."
        );
      });
  };

  useEffect(() => {
    if (!visibilityContext.value) {
      setEmail("");
      setPassword("");
    }
  }, [visibilityContext.value]);

  return (
    <div
      ref={backgroundRef}
      data-visibility={visibilityContext.value}
      className="w-full duration-200 z-[10] data-[visibility=true]:opacity-100 data-[visibility=true]:pointer-events-auto opacity-0 pointer-events-none bg-[#0009] backdrop-blur-sm shadow-md h-screen fixed left-0 top-0 flex justify-center pt-32"
    >
      <div
        ref={popupRef}
        data-visibility={visibilityContext.value}
        className="w-[90%] md:w-[30rem] duration-200 -translate-y-10 data-[visibility=true]:translate-y-0 h-fit bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="w-full h-16 border-b border-b-slate-300 flex justify-between items-center px-5">
          <p className="font-bold text-black text-xl">Signin</p>
          <button
            onClick={() => {
              visibilityContext.setValue(false);
            }}
          >
            <IoMdClose className="w-6 h-6 text-black opacity-70 hover:opacity-100 duration-100" />
          </button>
        </div>
        <form
          onSubmit={submitEventHandler}
          className="w-full h-fit p-5 flex flex-col gap-y-5"
        >
          <EmailField
            tabIndex={1}
            placeholder="Email address"
            value={email}
            setValue={setEmail}
            required
          />
          <div className="w-full flex flex-col items-end gap-y-1">
            <CustomLink tabIndex={3}>Forgot password</CustomLink>
            <PasswordField
              tabIndex={2}
              value={password}
              setValue={setPassword}
              placeholder="Password"
            />
          </div>
          <Button
            color="blue"
            size="large"
            type="submit"
            fluid
            loading={isLoading}
            disabled={submitBtnDisabled || isLoading}
          >
            LOGIN
          </Button>
          <div>
            <p>
              Don't have an account?{" "}
              <CustomLink
                onClick={() => visibilityContext.setValue(false)}
                url="/registration"
              >
                Register here
              </CustomLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPopup;
