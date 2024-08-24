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
import { v4 as uuidv4 } from "uuid";

const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name should be more than 2 characters" }),
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be atleast 4 characters",
  }),
});
export function SignUp() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const promise = account.create(
      uuidv4(),
      values.email,
      values.password,
      values.name
    );

    promise.then(
      function (response) {
        console.log(response);
        navigate("/");
      },
      function (error) {
        console.log(error);
      }
    );
    console.log(values);
  }
  return (
    <AuthWrapper
      title="Join Now"
      linkHref="/login"
      buttonLabel="Already a user"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-transparent border-gray-600"
                    placeholder="abc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="bg-transparent border-gray-600"
                    placeholder="abc@gmail.com"
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
                    className="bg-transparent border-gray-600"
                    placeholder="*****"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
