import InputForm from "@/components/InputForm/InputForm";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";
import { useRouter } from "next/router";
import { validation } from "@/data/validation";
import { Context } from "@/context/Context";

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

  const { loading, isAuthenticated } = useContext(Context);

  const router = useRouter();

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
          setRequest((prev) => ({
            ...prev,
            errorMessage: "",
            error: false,
          }));
          router.push("/gallery");
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
  if (isAuthenticated) {
    router.push("/gallery");
    return <div></div>;
  }

  if (loading) {
    return (
      <div className="h-[500px] grid place-items-center animate-pulse">
        Authenticating... Please wait
      </div>
    );
  }

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
          className="active:bg-gray-200 border-1 mt-2 py-0.5 bg-spb text-white rounded-[2px] "
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
