import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons/faLink";
import {useState} from "react";

export default function LinkCopy(props) {
    const [copiedPopup, setCopiedPopup] = useState(false);
    const [fadeOut, setFadeOut] = useState(false)

    return (
        <span className={"pointer tooltip"} onClick={() => {
            navigator.clipboard.writeText(props.txt);
            setCopiedPopup(true);
            console.log("copy")
            setTimeout(() => {

                setFadeOut(true);
                setTimeout(() => {
                    setFadeOut(false)
                    setCopiedPopup(false);
                }, 500)
            }, 2000)

        }}><FontAwesomeIcon icon={faLink}/>
            <span className={"tooltiptext" + (copiedPopup ? " tooltipvisible" : "") + (fadeOut ? " tooltipfadeout" : "")}>Copied! <span className={"copy-mobileonly"}>({props.txt})</span> </span>
        </span>
    )
}