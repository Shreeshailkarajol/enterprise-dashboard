import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginUser } from "../authThunk";

import type { LoginRequest } from "../types/auth.dto";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state) => state.auth
);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // Translate UI Model -> API Model
    const request: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    const result = await dispatch(loginUser(request));

    if (loginUser.fulfilled.match(result)) {
      console.log("Login Successful");
      // Later we'll navigate to Dashboard
    } else {
      console.log("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label>Email</label>

        <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
            required: "Email is required",
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email",
            },
            })}
        />

        {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
        <label>Password</label>

        <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
            },
            })}
        />

        {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
        <label>
            <input type="checkbox" {...register("rememberMe")} />
            Remember Me
        </label>
        </div>

        <button type="submit">
        Login
        </button>
        {error && (
            <p>{error}</p>
        )}
    </form>
);
};

export default LoginForm;