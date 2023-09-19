import InputForm from "@/components/InputForm/InputForm";
import { useFormik } from "formik";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { useRouter } from "next/router";

interface obj {
  email: string;
  password: string;
}

const Login = () => {
  const [request, setRequest] = useState({
    error: false,
    loading: false,
    errorMessage: "",
  });

  const router = useRouter();

  const validation = ({ email, password }: obj) => {
    const errors: any = {};

    if (email.length === 0) {
      errors.email = "Required";
    }

    if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid Email";
    }

    if (password.length < 6) {
      errors.password = "Must be 6 characters";
    }

    if (password.length === 0) {
      errors.password = "Required";
    }

    return errors;
  };

  const { handleChange, handleBlur, errors, values, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validation,
      onSubmit: async (values) => {
        setRequest((prev) => ({ ...prev, loading: true }));

        try {
          const result = await signInWithEmailAndPassword(
            firebaseAuth,
            values.email,
            values.password
          );
          const user = await result.user;
          console.log(user);
          setRequest((prev) => ({
            ...prev,
            errorMessage: "",
            error: false,
          }));
          router.push("/");
        } catch (e: any) {
          setRequest((prev) => ({
            ...prev,
            errorMessage: e.message.includes("invalid-login-credentials")
              ? "Invalid credentials"
              : e.messsage,
            error: true,
          }));

          setTimeout(() => {
            setRequest((prev) => ({
              ...prev,
              errorMessage: "",
              error: false,
              loading: false,
            }));
          }, 3000);
        } finally {
          setRequest((prev) => ({ ...prev, loading: false }));
        }
      },
    });

  //   console.log(request);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[500px] mx-auto max-w-[400px] border-1 mt-[5rem] py-1 px-2"
      >
        <h1 className="text-center mb-[2rem] text-[2rem] underline">Login</h1>

        <div className="space-y-1">
          <InputForm
            label="email"
            title="Email"
            handleBlur={handleBlur}
            handleChange={handleChange}
            inputType="email"
            inputValue={values.email}
            touched={touched.email}
            error={errors.email}
          />

          <InputForm
            label="password"
            title="Password"
            handleBlur={handleBlur}
            handleChange={handleChange}
            inputType="password"
            inputValue={values.password}
            touched={touched.password}
            error={errors.password}
          />
        </div>

        {request.error && (
          <div className="mt-1 text-[#ff0000]">{request.errorMessage}</div>
        )}

        <button
          type="submit"
          className="border-1 mt-2 py-0.5 bg-spb text-white rounded-[2px] "
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
