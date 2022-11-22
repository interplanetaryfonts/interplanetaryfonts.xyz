import { useEffect, useState } from "react";
import { client, exploreProfiles } from "../../api";
//import Link from 'next/link'
import MainContainer from "../../components/UI/MainContainer";
import ProfileGallery from "../../components/Universe/ProfileGallery";

export default function Home() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles });
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(
        response.data.exploreProfiles.items.map(async (profileInfo) => {
          let profile = { ...profileInfo };
          let picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith("ipfs://")) {
              let result = picture.original.url.substring(
                7,
                picture.original.url.length
              );
              profile.avatarUrl = "https://lens.infura-ipfs.io/ipfs/${result}";
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          let coverPicture = profile.coverPicture;
          if (
            coverPicture &&
            coverPicture.original &&
            coverPicture.original.url
          ) {
            if (coverPicture.original.url.startsWith("ipfs://")) {
              let result = coverPicture.original.url.substring(
                7,
                coverPicture.original.url.length
              );
              profile.bgUrl = "https://lens.infura-ipfs.io/ipfs/${result}";
            } else {
              profile.bgUrl = coverPicture.original.url;
            }
          }
          return profile;
        })
      );

      /* update the local state with the profiles array */
      setProfiles(profileData);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <MainContainer>
      <ProfileGallery />
    </MainContainer>
  );
}
