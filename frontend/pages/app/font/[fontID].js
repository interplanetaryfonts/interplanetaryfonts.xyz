// Components
import FontCard from "@/components/app/Font/FontCard/FontCard";
import FontDashboard from "@/components/app/Font/FontDashboard/FontDashboard";
import DashboardContainer from "@/components/app/UI/DashboardContainer";

export default function Font(props) {
  return (
    <DashboardContainer>
      <FontCard font={props.font} />
      <FontDashboard font={props.font} />
    </DashboardContainer>
  );
}
