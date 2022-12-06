
import '../App.css';
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import {Helmet} from "react-helmet";


export default function ContactMe() {



    return (
        <div className="App">
            <Helmet>
                <title>Contact Me</title>
            </Helmet>

            <div className={"col-display"}>
                <NavBar />
                <div className={"tuListContainer"}>
                    <div className={"tossup-box vert-list contact-me-box"}>
                        <div className={"donate-box-ttext"}>Contact Me</div>
                        <div className={"contact-list"}>
                            <div className={"contact-method"}>E-Mail: <a href={"mailto:mpkarpov@gmail.com"}>mpkarpov@gmail.com</a> <span className={"contact-exp"}>Ol' reliable</span></div>
                            <div className={"contact-method"}>Discord: <span className={"contact-emphasis"}>DrakonMichael#9583</span> <span className={"contact-exp"}>Fastest way to get in touch</span> </div>
                            <div className={"contact-method"}>LinkedIn: <a href={"https://www.linkedin.com/in/michael-karpov-228167208/"}>My account</a>  <span className={"contact-exp"}>I am unlikely to respond here</span> </div>
                            <div className={"contact-method"}>GitHub: <a href={"https://github.com/DrakonMichael"}>My account</a> <span className={"contact-exp"}>I check this sometimes, best way to get in touch regarding bug reports</span></div>
                        </div>
                        <span className={"vert-space"}>Or, use the form below:</span>
                        <div className={"contact-form"}>
                            <div>Under construction...</div>
                        </div>
                    </div>
                </div>


                <FooterBar />
            </div>
        </div>
    );
}

