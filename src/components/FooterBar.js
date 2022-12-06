import SettingsButton from "./SettingsButton";
import {Link} from "react-router-dom";

export default function FooterBar(props) {

    return (
        <div className={"footer-bar"}>
            <div className={"distribute-horizontal"}>
                <span><span className={"footer-bold"}>QDB</span> By <span className={"footer-bold"}>Michael Karpov</span></span>
                <Link to={"/contact"} className={"footer-link"}>Contact me</Link>
            </div>
        </div>
    )

}