import Link from "next/link";


export default function ProfilePage(props) {
  return (
    <div className="container max-w-screen-md flex flex-col flex-wrap md:flex-row gap-5 items-star pl-6 pr-6 pb-12">
      <div className="flex flex-col justify-center items-center ">
        <div className=" flex flex-row justify-around p-5 w-full  ">
          <img
            className="w-40 h-40 rounded-full border-solid border-red  border-4 "
            src={props.avatarUrl}
          />
          <div className=" flex flex-col space-y-2 ">
            <p className="text-2xl text-left text-red">@{props.handle}</p>
            <p className="text-l text-left text-red">{props.name}</p>
            <span id="lens-follow-small" data-handle={props.handle} />
          </div>
          {/* <p className="text-center text-xl font-bold mt-2 mb-2 w-1/2">
          {props.bio}
        </p> */}
        </div>
        {publications.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-fit">
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
