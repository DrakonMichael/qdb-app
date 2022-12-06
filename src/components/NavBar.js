import SettingsButton from "./SettingsButton";
import {useState} from "react";
import { Navigate } from "react-router-dom";

export default function NavBar(props) {
    const [redir, setRedir] = useState(false)


    return (
        <div className={"nav-bar"}>
          <span className={"nav-centerer"}>
            <span className={"nav-logo-text"} onClick={() => {setRedir(true)}}>QDB</span>
            <span className={"nav-logo-subtitle"}>Because "QuizDB" was too long</span>
          </span>

            <SettingsButton />
            {redir ? <Navigate to={"/"} /> : <></>}
        </div>
    )

}