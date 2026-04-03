"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";

/** Mantido para links antigos: envia para Configurações (âncora #team para admins). */
export default function TeamRedirectPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "ADMIN") {
      router.replace("/settings#team");
      return;
    }
    router.replace("/settings");
  }, [isLoading, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <LoadingSpinner />
    </div>
  );
}
