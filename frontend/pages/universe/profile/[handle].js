// Components

import MainContainer from "../../../components/UI/MainContainer";
/* pages/profile/[handle].js */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getPublications, getProfileByHandle } from "../../../clientApi";
import FollowButton from "../../../components/Universe/FollowButton";

export default function Profile() {
  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState();
  const [publications, setPublications] = useState([]);
  /* using the router we can get the lens handle from the route param */
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    async function fetchProfile() {
      try {
        /* fetch the user profile using their handle */
        const returnedProfile = await client.query({
          query: getProfileByHandle,
          variables: { handle },
        });

        const profileData = { ...returnedProfile.data.profile };
        console.log(JSON.stringify(profileData));
        /* format their picture if it is not in the right format */
        const picture = profileData.picture;
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith("ipfs://")) {
            let result = picture.original.url.substring(
              7,
              picture.original.url.length
            );
            profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
          } else {
            profileData.avatarUrl = profileData.picture.original.url;
          }
        }
        setProfile(profileData);
        /* fetch the user's publications from the Lens API and set them in the state */
        const pubs = await client.query({
          query: getPublications,
          variables: {
            id: profileData.id,
            limit: 10,
          },
        });

        setPublications(pubs.data.publications.items);
      } catch (err) {
        console.log("error fetching profile...", err);
      }
    }

    if (handle) {
      fetchProfile();
    }
  }, [handle]);

  if (!profile) return null;

  return (
    <MainContainer>
      <div className="container max-w-screen-l flex flex-col flex-wrap  justify-center items-center gap-5 pl-6 pr-6 pb-12">
        <div className="flex flex-col justify-center items-center  w-8/12">
          {/* Avatar Handle and name  */}
          <div className=" flex flex-col sm:flex-row justify-center items-center space-x-20 p-5 w-full  ">
            { /* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="avatar"
              className="w-40 h-40 rounded-full border-solid border-red  border-4 "
              src={profile.avatarUrl}
            />
            <div className=" flex flex-col space-y-2 ">
              <p className="text-2xl text-left text-red font-black ">
                @{profile.handle}
              </p>
              <p className="text-l text-left text-red">{profile.name}</p>
              {/* <span id="lens-follow-small" data-handle={profile.handle} /> */}
              <FollowButton
                id={profile.id}
                handle={profile.handle}
                isFollowedByMe={profile.isFollowedByMe}
              ></FollowButton>
            </div>
            {/* <p className="text-center text-xl font-bold mt-2 mb-2 w-1/2">
              {profile.bio}
            </p> */}
          </div>
          {/* stats */}
          <div className=" flex flex-row flex-wrap md:space-x-2 justify-start w-fit space-x-0  ">
            <div className=" flex flex-col border-solid border-red border-4  px-5 py-2">
              <p className="text-md text-center text-red">Followers</p>
              <p className="text-sm text-center text-red">
                {profile.stats.totalFollowers}
              </p>
            </div>
            <div className=" flex flex-col border-solid border-red border-4 px-5 py-2 ">
              <p className="text-md text-center text-red">Following</p>
              <p className="text-sm text-center text-red">
                {profile.stats.totalFollowing}
              </p>
            </div>
            <div className=" flex flex-col border-solid border-red border-4 px-5 py-2 ">
              <p className="text-md text-center text-red">Mirrors</p>
              <p className="text-sm text-center text-red">
                {profile.stats.totalMirrors}
              </p>
            </div>
          </div>

          {publications.map((pub) => (
            <div
              key={pub.id}
              className="shadow p-10 rounded mb-8 w-fit md:w-9/12"
            >
              <p>{pub.metadata.content}</p>
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
}
