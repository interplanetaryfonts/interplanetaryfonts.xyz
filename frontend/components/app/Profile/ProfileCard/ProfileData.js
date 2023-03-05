import classes from "@/styles/CardData.module.css";

export default function ProfileData(props) {
  return (
    <div className={classes.container}>
      <div
        style={{
          backgroundImage: `url("${
            props.user?.avatar ??
            "https://camo.githubusercontent.com/faf8aed8797f3b9e431ab0a4874bfee09697b319709c84deca6211283de0d52e/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f657468676c6f62616c2d6170692d70726f64756374696f6e2f70726f6a656374732f656b77756f2f696d616765732f696e746572706c616e65746172792d666f6e74732d6c6f676f2d64756f746f6e652d62672d37322d6470692e706e67"
          }")`,
        }}
        className={classes.avatar}
      ></div>
      <h6 className={classes.username}>
        <em>{props.user?.username ? `@${props.user?.username}` : ""}</em>
      </h6>
      <div className={classes.follow}>
        <p className={classes["follow-el"]}>
          <strong>Followers:</strong>
          {props.user?.followers ?? 0}
        </p>
        <p className={classes["follow-el"]}>
          <strong>Following:</strong>
          {props.user?.following ?? 0}
        </p>
      </div>
      <a href={props.user?.website ?? ""} target="blank">
        {(props.user?.website ?? "").replace(/https?:\/\//, "")}
      </a>
      {props.connected && (
        <button className={classes.edit}>Edit Profile</button>
      )}
      <div className={classes.about}>
        <h6>About</h6>
        <p>{props.user?.about ?? ""}</p>
      </div>
      <div className={classes.social}>
        {props.user.social
          ? props.user.social.map((handle, i) => (
              <a
                key={`handle-${i}`}
                className={classes.handle}
                href={handle.url}
                target="blank"
              >
                {handle.icon}
              </a>
            ))
          : ""}
      </div>
    </div>
  );
}
