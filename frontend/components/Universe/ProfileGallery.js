import { useEffect, useState } from 'react'
import { client, exploreProfiles } from '../../api'

import ProfilePreview from "./ProfilePreview";

// const dummyProfiles = [
//   {
//     handle: "Guttenberg.lens",
//     followers: 200,
//     following: 300,
//     url: "gutenpapa.xyz",
//     backGroundImage:
//       "https://upload.wikimedia.org/wikipedia/commons/2/27/Gutenberg_bible_Old_Testament_Epistle_of_St_Jerome.jpg",

//     profile: {
//       nme: "Johannes Gutenberg",
//       description:
//         "Johannes Gensfleisch zur Laden zum Gutenberg  was a German inventor, printer, publisher, and goldsmith who introduced printing to Europe with his mechanical movable-type printing press.",
//       url: "gutenpapa.xyz",
//       avatar:
//         "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
//     },
//   },
//   {
//     handle: "Foundethional.lens",
//     followers: 200,
//     following: 300,
//     url: "font/test-font",
//     backGroundImage:
//       "https://www.calligraphersguild.org/exhibits/2009-SheilaWaters/sw-roundel-large.jpg",

//     profile: {
//       nme: "Sheila Waters",
//       description:
//         "Sheila Waters was born in Gravesend, England, on 13 March 1929. She graduated from the Medway College of Art, and received an associate degree from the Royal College of Art in London in 1951.",
//       url: "waters.xyz",
//       avatar:
//         "https://www.calligraphersguild.org/images/SHEILA-WATERS-Zoe--by-Yukimi-Annand-2016.jpg",
//     },
//   },
//   {
//     handle: "Bitdoni.lens",
//     followers: 200,
//     following: 300,
//     url: "font/test-font",
//     backGroundImage:
//       "https://museobodoniano.com/appwp/wp-content/uploads//2018/05/museo-bodoniano-giambattista-bodoni-opera-punzoni-copertina.jpg",

//     profile: {
//       nme: "Giambattista Bodoni",
//       description:
//         "He first took the type-designs of Pierre Simon Fournier as his exemplars, but afterwards became an admirer of the more modelled types of John Baskerville; and he and Firmin Didot evolved a style of type called Modern.",
//       url: "bodoni.xyz",
//       avatar:
//         "https://upload.wikimedia.org/wikipedia/commons/5/55/Giambattista_Bodoni_by_Giuseppe_Lucatelli.jpg",
//     },
//   },
//   {
//     handle: "Ethrajan.lens",
//     url: "font/test-font",
//     backGroundImage:
//       "https://upload.wikimedia.org/wikipedia/commons/e/e4/Trajan_typeface_specimen.svg",

//     profile: {
//       nme: "Carol Twombly",
//       description:
//         "Carol Twombly was born June 13, 1959 in Concord, Massachusetts.[7] She attended and graduated from the Rhode Island School of Design (RISD) where she first studied sculpture, and later changed her major to graphic design. She credits her professors Charles Bigelow and Kris Holmes",
//       url: "Twombly.xyz",
//       avatar:
//         "https://www.fontshop.com/cdn-cgi/image/format=auto/https://fontshop-prod-responsive-images.s3.amazonaws.com/uploads/profile_image/attachment/386499/large_Carol-Twombly_crop@2x.jpg",
//     },
//   },
//   {
//     handle: "Bitdana.lens",
//     followers: 200,
//     following: 300,
//     url: "font/test-font",
//     backGroundImage:
//       "https://upload.wikimedia.org/wikipedia/commons/0/01/VerdanaSpecimen.svg",

//     profile: {
//       nme: "Matthew Carter",
//       description:
//         "Carter's career began in the early 1960s and has bridged all three major technologies used in type design: physical type, phototypesetting and digital font design, as well as the design of custom lettering.",
//       url: "carter.xyz",
//       avatar:
//         "https://upload.wikimedia.org/wikipedia/commons/0/05/20180914-ATypI-2018-Matthew_Carter-NP.jpg",
//     },
//   },
//   {
//     handle: "Alcubit.lens",
//     followers: 200,
//     following: 300,
//     url: "font/test-font",
//     backGroundImage:
//       "https://www.linotype.com/cdn-cgi/image/format=auto/https://image.linotype.com/cms/alcuin_01a_d31413i32.gif",

//     profile: {
//       nme: "Gudrun Zapf-von Hesse",
//       description:
//         "he became an apprentice and assistant at the bookbindery of Otto Dorfner in Weimar from 1934 to 1937. Her calligraphy practice began during this apprenticeship; in her acceptance address for the Goudy Award.",
//       url: "gudrum.xyz",
//       avatar:
//         "https://upload.wikimedia.org/wikipedia/commons/c/c7/20160320T160542-GZvH-NP.jpg",
//     },
//   },
// ];

export default function ProfileGallery(props) {
  //const [profiles] = useState(dummyProfiles);
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles })
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(response.data.exploreProfiles.items.map(async profileInfo => {
        let profile = { ...profileInfo }
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }
        return profile
      }))

      /* update the local state with the profiles array */
      setProfiles(profileData)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
      <div className="container sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
      {profiles.map(profile => (
            <ProfilePreview
            key={profile.id}
            handle={profile.handle}
            followers={profile.stats.totalFollowers}
            //following={lens.following}
            profileNme={profile.name}
            description={profile.bio}
            avatar={profile.avatarUrl || 'https://picsum.photos/200'}
            website={`/profile/${profile.handle}`}
            //backGroundImage={lens.backGroundImage}
            url={`/profile/${profile.handle}`}
          />
          ))}
    </div>
  );
}
