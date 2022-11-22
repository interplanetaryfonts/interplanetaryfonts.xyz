import Link from "next/link";
import MainContainer from "../UI/MainContainer";
import FollowButton from "./FollowButton";

export default function ProfilePreview(props) {
  return (
    <MainContainer>
      <div className=" max-w-xs min-w-fit container flex flex-col border-2 border-solid border-blue rounded   ">
        <div className="flex flex-col items-center  justify-items-center">
          <Link href={props.url}>
            <div
              className=" w-full h-48 bg-white bg-cover bg-center cursor-pointer bg-no-repeat "
              style={{ backgroundImage: `url("${props.backGroundImage}")` }}
            ></div>
          </Link>
          <Link href={props.url}>
            <div
              className=" mt-20 h-36 w-36 md rounded-full absolute  z-10  border-4 border-solid border-red 
          bg-slate-600 bg-cover bg-center hover:border-4 hover:border-solid hover:border-yellow  cursor-pointer box-content bg-no-repeat"
              style={{ backgroundImage: `url("${props.avatar}")` }}
            ></div>
          </Link>
        </div>
        <div className="container mt-12 flex flex-col items-center  justify-items-center max-w-xs gap-1 ">
          <Link href={props.url}>
            <p className="text-darkblue text-2xl text-left font-black cursor-pointer hover:text-red">
              @{props.handle}
            </p>
          </Link>
          <Link href={props.url}>
            <p className="text-darkblue text-left text-sm font-light cursor-pointer hover:text-red">
              {props.profileName}
            </p>
          </Link>
          {/*   <Link href={props.website}>
            <p className="text-red text-left text-sm font-light cursor-pointer hover:text-darkblue">
              {props.website}
            </p>
          </Link> */}
          <p className="text-darkbluetext-left text-sm font-light px-10 py-4">
            Following: {props.following} | Followers: {props.followers}
          </p>
          <p className="text-darkbluetext-left text-sm font-light px-10 py-4">
            {props.description}
          </p>
        </div>
        <Link href={props.url}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-1 border border-transparent text-sm text-center justify-center  font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 w-10/12 self-center mb-5"
          >
            {props.handle}
          </button>
        </Link>
      </div>
    </MainContainer>
  );
}
