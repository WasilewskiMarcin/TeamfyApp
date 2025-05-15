import { createContext, useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";

export type ConvexUser={
    _id: Id<'users'>;
    username: string;
    image: string;
    bio?: string;
    clerkId: string;
}

type ConvexUserContextType = {
  convexUser: ConvexUser | null
  setConvexUser: (user: ConvexUser) => void
}

export const ConvexUserContext = createContext<ConvexUserContextType | undefined>(undefined)

export const useConvexUser = () => {
  const context = useContext(ConvexUserContext)
  if (!context) {
    throw new Error('useConvexUser must be used within a ConvexUserProvider')
  }
  return context
}