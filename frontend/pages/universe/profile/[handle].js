import Link from "next/link";

// Components
import Button from "../../../components/UI/Button";
import ProfileGallery from "../../../components/Universe/ProfileGallery";
import ProfilePreview from "../../../components/Universe/ProfilePreview";
import MainContainer from "../../../components/UI/MainContainer";

/* pages/profile/[handle].js */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { client, getPublications, getProfile } from '../../../api'

export default function Profile() {
  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  /* using the router we can get the lens handle from the route param */
  const router = useRouter()
  const { handle } = router.query

  useEffect(() => {
    if (handle) {
      fetchProfile()
    }
  }, [handle])

  async function fetchProfile() {
    try {
      /* fetch the user profile using their handle */
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle }
      })
      const profileData = { ...returnedProfile.data.profile }
      /* format their picture if it is not in the right format */
      const picture = profileData.picture
      if (picture && picture.original && picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          let result = picture.original.url.substring(7, picture.original.url.length)
          profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
        } else {
          profileData.avatarUrl = profileData.picture.original.url
        }
      }
      setProfile(profileData)
            /* fetch the user's publications from the Lens API and set them in the state */
      const pubs = await client.query({
        query: getPublications,
        variables: {
            id: profileData.id, limit: 50
        }
      })
      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log('error fetching profile...', err)
    }
  }

  if (!profile) return null

  return (
    <MainContainer>
     <ProfilePreview />
    </MainContainer>
  )
}

