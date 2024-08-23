import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export function AuthWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center text-semibold">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" variant="outline">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
