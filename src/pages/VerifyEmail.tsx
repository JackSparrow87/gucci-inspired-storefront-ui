
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-4 bg-[#FDF8F7]">
      <Card className="w-full max-w-md bg-white shadow-md rounded-md overflow-hidden border-oldrose/10">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-serif">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a verification link to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="my-6">
            <p className="text-muted-foreground mb-4">
              Please check your email inbox and click on the verification link to activate your account.
            </p>
            <p className="text-muted-foreground mb-4">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link to="/auth" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
