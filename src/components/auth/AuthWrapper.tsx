import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function AuthWrapper({ children, title, linkHref, buttonLabel }) {
  return (
    <Card className="w-[450px] shadow-2xl border border-slate-600 outline-0 backdrop-blur-sm bg-white/30">
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Link
          to={linkHref}
          className="w-full text-center flex justify-center items-center gap-2 text-gray-700"
        >
          {buttonLabel}
          <ArrowUpRight />
        </Link>
      </CardFooter>
    </Card>
  );
}
