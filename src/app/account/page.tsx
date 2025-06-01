"use client"
import { HeaderComponent, AccountComponent, FooterComponent } from "@/components";
import ProtectedRouteComponent from "@/components/ProtectedRouteComponent";


export default function AccountPage() {
  return (
    <ProtectedRouteComponent>
        <HeaderComponent />
        <main>
            <AccountComponent />
        </main>
        <FooterComponent />
    </ProtectedRouteComponent>
  );
}
