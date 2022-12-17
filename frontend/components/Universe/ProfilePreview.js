import Link from "next/link";
import Button from "../../components/UI/Button";

export default function ProfilePreview(props) {
  return (
    <div className="container max-w-xs min-w-[200px] flex flex-col border-2 border-solid border-red rounded justify-between ">
      <div className="flex flex-col items-center justify-items-center">
        <Link href={props.url}>
          <div
            className="w-full h-48 bg-white bg-cover bg-center cursor-pointer bg-no-repeat border-b-[2px] border-solid border-red"
            style={{
              backgroundImage: `url("${props.backGroundImage}")`,
            }}
          ></div>
        </Link>
        <Link href={props.url}>
          <div
            className="bg-white mt-20 h-36 w-36 rounded-full absolute z-10 border-4 border-solid border-red bg-cover bg-center hover:border-4 hover:border-solid cursor-pointer box-content bg-no-repeat"
            style={{ backgroundImage: `url("${props.avatar}")` }}
          ></div>
        </Link>
      </div>
      <div className="container mt-12 flex flex-col items-center justify-items-center max-w-xs gap-1">
        <Link href={props.url}>
          <p className="w-full text-darkblue text-xl text-left font-black cursor-pointer hover:text-red overflow-scroll text-center">
            {props.handle}
          </p>
        </Link>
        <Link href={props.url}>
          <p className="text-darkblue text-left text-sm font-light cursor-pointer hover:text-red">
            {props.profileName}
          </p>
        </Link>
        <p className="text-darkblue text-left text-sm font-light px-10 py-4 flex gap-2 width-full">
          <span>
            <strong>Following:</strong> {props.following}
          </span>
          <span>
            <strong>Followers:</strong> {props.followers}
          </span>
        </p>
        <p className="text-darkblue text-left text-sm font-light px-10 py-4 w-full text-center">
          {props.description}
        </p>
      </div>
      <Link href={props.url} passHref>
        <Button className="w-[16rem] self-center mb-[1rem]">
          {props.handle}
        </Button>
      </Link>
    </div>
  );
}
