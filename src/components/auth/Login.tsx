import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrapper } from "./AuthWrapper";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { account } from "../../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be atleast 4 characters",
  }),
});
export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      navigate("/");
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthWrapper
      title="Welcome Back"
      linkHref="/register"
      buttonLabel="New user? Create an account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="abc@gmail.com"
                    className="bg-transparent border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="*****"
                    className="bg-transparent border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
