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
        <Button variant="outline" className="w-full">
          <Github />
        </Button>
      </form>
    </>
  );
}

export default GithubSignIn;
