import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { signIn } from "@/lib/auth";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Handle Google Login

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full h-screen max-w-5xl mx-auto",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden w-full h-full mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
          <div className="p-6 md:p-12 flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-6 justify-center items-center">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Log in with your Google account
                </p>
              </div>
              <div className="flex justify-center items-center">
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", {
                      redirectTo: "/home",
                    });
                  }}
                >
                  <Button className="w-full text-white">
                    <div className="gsi-material-button-icon mr-2">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="display: block;"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>{" "}
                    Sign in with Google
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block ">
            <Image
              src="/assets/log-in.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
              width={1000}
              height={1000}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-6">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
