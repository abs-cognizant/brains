// components/ProtectedRouteComponent.tsx
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRouteComponent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is complete AND there's no user.
    // This prevents premature redirects while localStorage is being checked.
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // While loading (checking localStorage), show a loader.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 text-lg font-semibold">Loading authentication state...</div>
        {/* You could add a spinner here for better UX */}
      </div>
    );
  }

  // If loading is complete and there's no user, the useEffect above will redirect.
  // So, if we reach this point, it means loading is complete AND user exists.
  // We can safely render children.
  if (!user) {
    // This case should ideally be handled by the useEffect above,
    // but as a fallback or for clarity, we can return null or an empty div
    // if a redirect is imminent but the component briefly renders.
    return null; // Or <></>
  }

  return <>{children}</>;
}