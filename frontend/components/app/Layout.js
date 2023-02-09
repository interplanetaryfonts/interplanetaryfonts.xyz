import NavBar from "@/components/app/UI/NavBar";
import MainContainer from "@/components/shared/UI/MainContainer";
import Footer from "@/components/shared/UI/Footer";
import Disclaimer from "@/components/shared/UI/Disclaimer";

export default function Layout({
  children,
  handleLensLogin,
  handleLensLogout,
  token,
}) {
  return (
    <MainContainer>
      <Disclaimer />
      <NavBar
        handleLensLogin={handleLensLogin}
        handleLensLogout={handleLensLogout}
        token={token}
      />
      {children}
      <Footer />
    </MainContainer>
  );
}
