"use client"
import { HeaderComponent, ChatComponent, FooterComponent } from "@/components";
import ProtectedRouteComponent from "@/components/ProtectedRouteComponent";

export default function AccountPage() {

  return (
    <ProtectedRouteComponent>
        <HeaderComponent />
        <main>
            <ChatComponent />
        </main>
        <FooterComponent />
    </ProtectedRouteComponent>
  );
}
