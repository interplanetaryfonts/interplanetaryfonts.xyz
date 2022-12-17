import { useState } from "react";
import classes from "../../../styles/FontDashboard.module.css";
// Components
// Components
import DashboardContent from "../../UI/DashboardContent";
import Charset from "./Charset";
import CharsetList from "./CharsetList";
import FontTester from "./FontTester";
import Specimen from "./Specimen";
import MintButton from "./MintButton";
import MintModal from "../../Overlay/MintModal";

export default function FontDashboard(props) {
  const [price, setPrice] = useState(0);
  const [chars, setChars] = useState(
    [...props.font.charset].map((ch) => {
      return { char: ch, checked: false, clss: "" };
    })
  );
  const [unit] = useState(props.font.price / props.font.charset.length);
  const [mounted, setMounted] = useState(false);
  // Event Handler
  const handleLetterClick = (e) => {
    const char = e.target.textContent;
    const ix = chars.findIndex((ch) => char === ch.char);
    const tempChars = [...chars];
    tempChars[ix].checked = !tempChars[ix].checked;
    tempChars[ix].clss = tempChars[ix].clss === "" ? "letter-checked" : "";
    //  i = chars.findIndex(ch);
    setChars(tempChars);
    setPrice((prevPrice) =>
      Math.abs(prevPrice + (tempChars[ix].checked ? unit : -unit))
    );
  };
  const handleCharList = (e) => {
    const list = e.target.value;
    const filteredChars = chars.map((ch) => {
      if (
        list === "Complete" ||
        (list === "Uppercase" && ch.char.match(/[A-Z]/)) ||
        (list === "Lowercase" && ch.char.match(/[a-z]/))
      ) {
        ch.checked = true;
        ch.clss = "letter-checked";
      } else {
        ch.checked = false;
        ch.clss = "";
      }
      return ch;
    });
    setChars(filteredChars);
    setPrice(filteredChars.filter((ch) => ch.checked).length * unit);
  };
  const handleMount = (bool) => {
    setMounted(bool);
  };
  // Component
  return (
    <>
      <DashboardContent>
        <Specimen
          fontname={props.font.nme}
          cssname={props.font.cssname}
          weight={props.font.weight}
          specimen={props.font.specimen}
        />
        <FontTester cssname={props.font.cssname} weight={props.font.weight} />
        <p className="text-left">
          Please select the characters you want to mint or select an option of
          pre-selected charsets in the list bellow.
        </p>
        <CharsetList
          charsets={props.font.preselect}
          handleCharList={handleCharList}
        />
        <Charset
          cssname={props.font.cssname}
          weight={props.font.weight}
          chars={chars}
          handleLetterClick={handleLetterClick}
        />
        <div className={classes.checkout}>
          <h5>Price: {price.toFixed(4)} MATIC</h5>
          <MintButton handleMount={handleMount} />
        </div>
      </DashboardContent>
      <MintModal price={price} handleMount={handleMount} mounted={mounted} />
    </>
  );
}
