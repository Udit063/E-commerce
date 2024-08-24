import { LoginForm } from "@/components/auth/Login";

function Login() {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[url('/src/assets/background.jpeg')] bg-no-repeat bg-cover">
      <LoginForm />
    </div>
  );
}

export default Login;
