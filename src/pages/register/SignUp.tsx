import { SignUpForm } from "@/components/auth/SignUp";

function SignUp() {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[url('/src/assets/background.jpeg')] bg-no-repeat bg-cover">
      <SignUpForm />
    </div>
  );
}

export default SignUp;
