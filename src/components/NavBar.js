import SettingsButton from "./SettingsButton";

export default function NavBar(props) {

    return (
        <div className={"nav-bar"}>
          <span className={"nav-centerer"}>
            <span className={"nav-logo-text"}>QDB</span>
            <span className={"nav-logo-subtitle"}>Because "QuizDB" was too long</span>
          </span>

            <SettingsButton />
        </div>
    )

}