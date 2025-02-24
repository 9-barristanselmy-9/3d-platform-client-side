import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
function GithubSignIn() {
  return (
    <>
      <form
        action={async () => {
                  "use server";
                  await signIn("github", {
                    redirectTo: "/",
                  });
                }}
      >
        <Button className="w-full h-12 flex items-center justify-center text-white">
          <Github />
          Sign in with Github
        </Button>
      </form>
    </>
  );
}

export default GithubSignIn;
