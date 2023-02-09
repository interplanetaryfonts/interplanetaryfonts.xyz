import NavBar from "@/components/home/UI/NavBar";
import MainContainer from "@/components/shared/UI/MainContainer";
import Footer from "@/components/shared/UI/Footer";
import Disclaimer from "@/components/shared/UI/Disclaimer";

export default function Layout({ children }) {
  return (
    <MainContainer>
      <Disclaimer />
      <NavBar />
      {children}
      <Footer />
    </MainContainer>
  );
}
