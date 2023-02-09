// Components
import FontCard from "@/components/Font/FontCard/FontCard";
import FontDashboard from "@/components/Font/FontDashboard/FontDashboard";
import DashboardContainer from "@/components/UI/DashboardContainer";

export default function Font(props) {
  return (
    <DashboardContainer>
      <FontCard font={props.font} />
      <FontDashboard font={props.font} />
    </DashboardContainer>
  );
}
