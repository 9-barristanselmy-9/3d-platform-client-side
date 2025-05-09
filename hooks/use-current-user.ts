
import { useSession } from "next-auth/react";
export const useCuurentUser = () => {
  const session = useSession();
  return session.data?.user;
};
