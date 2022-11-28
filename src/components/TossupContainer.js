import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Highlighter from "react-highlight-words";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import {CategoryIDToName, SubcategoryIDToName, TournamentIDToName} from "./Translators";
import {useState} from "react";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";

export default function TossupContainer(props) {

    const [showData, setShowData] = useState(false)

    const replaceTextWithHighlight = (text, highlight) => {
        if(highlight === "") {return text}
        var regex = new RegExp(highlight, "g");

        return text.replaceAll(regex, "<span class='text-highlight'>" + highlight + "</span>")
    }

    return (<>
        <div className={"tossup-box"}>
            <div className={"question-data-box"} onClick={() => setShowData(!showData)}>
                <div className={"question-data-row"}>
                    <span className={"question-text-bold vert-align"}>{props.num+1}.</span>
                    <span className={"dropdown-arrow vert-align"}>
                        {showData ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} /> }
                    </span>
                    <span className={"vert-align em090"}><TournamentIDToName id={props.tossup.tournament_id.toString()}/> | <CategoryIDToName id={props.tossup.category_id.toString()}/> | <SubcategoryIDToName id={props.tossup.subcategory_id.toString()}/></span>
                </div>

                <div className={"dropdown-info-boxes " + (showData ? "" : "invisible")}>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>ID</div>
                        <div className={"tu-info-data"}>{props.tossup.id}</div>
                    </div>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>Tournament</div>
                        <div className={"tu-info-data"}>{props.tossup.tournament_id} : <TournamentIDToName id={props.tossup.tournament_id.toString()}/></div>
                    </div>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>Round</div>
                        <div className={"tu-info-data"}>{props.tossup.round}</div>
                    </div>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>#</div>
                        <div className={"tu-info-data"}>{props.tossup.number}</div>
                    </div>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>Category</div>
                        <div className={"tu-info-data"}>{props.tossup.category_id} : <CategoryIDToName id={props.tossup.category_id.toString()}/></div>
                    </div>
                    <div className={"dropdown-info-box"}>
                        <div className={"tu-info-header"}>Subcategory</div>
                        <div className={"tu-info-data"}>{props.tossup.subcategory_id} : <SubcategoryIDToName id={props.tossup.subcategory_id.toString()}/></div>
                    </div>
                </div>
            </div>
            <div className={"question-padder"}>
                <span className={"question-text-bold"}>Question:</span>
                <span dangerouslySetInnerHTML={{__html: replaceTextWithHighlight(props.tossup.formatted_text, props.searchTerm)}} />
                {/*
                <Highlighter
                    searchWords={[props.searchTerm]}
                    autoEscape={true}
                    textToHighlight={props.tossup.text}
                />*/}
            </div>
            <div className={"question-answer-box question-padder"}>
                <span className={"question-text-bold"}>Answer:</span>

                <span dangerouslySetInnerHTML={{__html: replaceTextWithHighlight(props.tossup.formatted_answer, props.searchTerm)}} />

                {/*
                <Highlighter
                    searchWords={[props.searchTerm]}
                    autoEscape={true}
                    textToHighlight={props.tossup.answer}
                />*/}

            </div>

        </div>



    </>)

}