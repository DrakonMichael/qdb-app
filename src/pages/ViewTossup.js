
import '../App.css';
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import axios from "axios";
import TossupContainer from "../components/TossupContainer";
import {useParams} from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle";


export default function ViewTossup(props) {
    const params = useParams()
    const [tossup, setTossup] = useState(null)
    const [errored, setErrored] = useState(false)

    useEffect(() => {
        const cfg = {
            headers:{
                'Access-Control-Allow-Origin': '*',
            }
        };

        axios.get(`https://api.nocard.org:8080/api/tossups?type=id&id=${params.id}`, cfg).then((res) => {
            if(res.data.message === "success") {
                setTossup(res.data.data)
            } else {
                setErrored(true)
            }

        }).catch((err) => {
            setErrored(true)
        })

        //https://api.nocard.org:8080/api/tossups?type=id&id=59768
    }, [])

    let tu = tossup ? <TossupContainer type={0} tossup={tossup} num={0} searchTerm={""} /> : <div className={"ntu-text"}>Loading...<LoadingCircle /></div>

    return (
        <div className="App">
            <Helmet>
                <title>{"Viewing tossup" + params.id}</title>
            </Helmet>

            <div className={"col-display"}>
                <NavBar />

                <div className={"tuListContainer"}>
                    {errored ? <>An error has occured</> : <>
                        <div>Now inspecting a single tossup</div>
                        <div style={{marginBottom: "20px"}}>You can share this URL to show this tossup.</div>
                        {tu}</>}
                </div>


                <FooterBar />
            </div>
        </div>
    );
}

