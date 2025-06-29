"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ModelCardWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  avatar?: {
    src: string;
    fallback: string;
  };
}

const CardWrapper = ({
  children,
  title,
  description,
  footer,
  avatar,
}: ModelCardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {avatar && (
            <Avatar>
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardWrapper;
