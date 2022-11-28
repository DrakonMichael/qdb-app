import SettingsButton from "./SettingsButton";

export default function FooterBar(props) {

    return (
        <div className={"footer-bar"}>
            <div className={"distribute-horizontal"}>
                <span><span className={"footer-bold"}>QDB</span> By <span className={"footer-bold"}>Michael Karpov</span></span>
                <a className={"footer-link"}>Contact me</a>
            </div>
        </div>
    )

}