import Footer from "@/components/footer/Footer";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children:ReactNode 
}

function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <>
    <HeaderWrapper />
    {children}
    <Footer />
    </>
  )
}

export default DashboardLayout;