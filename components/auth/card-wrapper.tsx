"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
      <CardHeader className="px-8 pt-12 pb-8 text-center space-y-2">
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent className="px-8 pb-8 space-y-6">{children}</CardContent>

      {showSocial && (
        <CardFooter className="px-8 pb-6">
          <Social />
        </CardFooter>
      )}

      <CardFooter className="px-8 pb-12 pt-4 border-t border-slate-100">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
