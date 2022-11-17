import { useState } from "react";
import Link from "next/link";

// Components
import Button from "../../../components/UI/Button";
import ProfileGallery from "../../../components/Universe/ProfileGallery";
import MainContainer from "../../../components/UI/MainContainer";

export default function Gallery(props) {
  return (
    <MainContainer>
      <ProfileGallery />
    </MainContainer>
  );
}
