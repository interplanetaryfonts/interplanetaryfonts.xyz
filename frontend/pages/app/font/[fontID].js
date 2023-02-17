// Components
import FontCard from "@/components/app/Font/FontCard/FontCard";
import FontDashboard from "@/components/app/Font/FontDashboard/FontDashboard";
import DashboardContainer from "@/components/app/UI/DashboardContainer";
import Layout from "@/components/app/Layout";

export default function Font(props) {
  return (
    <DashboardContainer>
      <FontCard font={props.font} />
      <FontDashboard font={props.font} />
    </DashboardContainer>
  );
}

Font.getLayout = function getLayout(page, props) {
  return <Layout {...props}>{page}</Layout>;
};
