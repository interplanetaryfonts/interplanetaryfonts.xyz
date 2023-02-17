import MainContainer from "@/components/app/UI/MainContainer";
import ProfileGallery from "@/components/app/Universe/ProfileGallery";
import Layout from "@/components/app/Layout";

export default function Universe() {
  return (
    <MainContainer>
      <ProfileGallery />
    </MainContainer>
  );
}

Universe.getLayout = function getLayout(page, props) {
  return <Layout {...props}>{page}</Layout>;
};
