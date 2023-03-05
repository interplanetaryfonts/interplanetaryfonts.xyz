import { useEffect, useState } from "react";
import { client as lensClient, exploreProfiles } from "@/clientApi";
import ProfilePreview from "./ProfilePreview";

export default function ProfileGallery() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      const response = await lensClient.query({ query: exploreProfiles });
      /* loop over profiles, create properly formatted ipfs image links */
      const profileData = await Promise.all(
        response.data.exploreProfiles.items.map(async (profileInfo) => {
          const profile = { ...profileInfo };
          const picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith("ipfs://")) {
              const result = picture.original.url.substring(
                7,
                picture.original.url.length
              );
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          const coverPicture = profile.coverPicture;
          if (
            coverPicture &&
            coverPicture.original &&
            coverPicture.original.url
          ) {
            if (coverPicture.original.url.startsWith("ipfs://")) {
              const result = coverPicture.original.url.substring(
                7,
                coverPicture.original.url.length
              );
              profile.bgUrl = `https://lens.infura-ipfs.io/ipfs/${result}`;
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

  if (!profiles.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-screen-xl flex flex-col flex-wrap md:flex-row gap-5 justify-between items-between pl-6 pr-6 pb-12">
      {profiles.map((profile) => (
        <ProfilePreview
          key={profile.id}
          handle={profile.handle}
          isFollowedByMe={profile.isFollowedByMe}
          id={profile.id}
          followers={profile.stats.totalFollowers}
          following={profile.stats.totalFollowing}
          profileName={profile.name}
          description={profile.bio}
          avatar={profile.avatarUrl || "https://picsum.photos/200"}
          website={`universe/profile/${profile.handle}`}
          backGroundImage={profile.bgUrl || "https://picsum.photos/200"}
          url={`universe/profile/${profile.handle}`}
        />
      ))}
    </div>
  );
}
