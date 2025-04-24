"use client";
import { Button } from "../ui/button";
import { githubAuthenticate } from "@/actions/gitHub-login";
import { Github } from "lucide-react";
import { useActionState } from "react";

function GitHubLogIn() {
  const [errorMsgithub, dispatchGithub] = useActionState(
    githubAuthenticate,
    undefined
  );
  return (
    <form className="flex items-center" action={dispatchGithub}>
      <Button variant="outline" className="w-full">
        <Github />
      </Button>
      <p>{errorMsgithub}</p>
    </form>
  );
}

export default GitHubLogIn;
