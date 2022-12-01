import {useEffect, useState} from "react";

import axios from "axios"
import TossupContainer from "./TossupContainer";
import LoadingCircle from "./LoadingCircle";

const categoryMapping = require("../mappings/categoryMapping.json")

export default function TossupList(props) {
    const [tossups, setTossups] = useState([])
    const [haveTossups, setHaveTossups] = useState(true)
    console.log("PARAMS", props.params)
    useEffect(() => {
        if(props.params.noRender) return;
        setTossups([])
        //http://localhost:8080/api/tossups?type=quizdb&diffis=[1,%202,%203]&subcats=[1,%202,%203,%204,%205]&limit=5&searchtype=0&searchterm=QDBNOSEARCH&tournaments=[]&random=1

        let search = props.params.searchQuery.length > 0 ? props.params.searchQuery : "QDBNOSEARCH"
        if(props.params.questionType[0] === 0) {
            axios.get(`https://24.199.88.237:8080/api/tossups?type=quizdb&diffis=[${props.params.difficultyList.join(",")}]&subcats=[${props.params.subcategoryList.join(",")}]&limit=${props.params.num}&searchtype=${props.params.searchType[0]}&searchterm=${search}&tournaments=[${props.params.tournamentList.join(",")}]&random=${props.params.rand ? 1 : 0}`).then((res) => {
                if(res.data.message === "success") {
                    setTossups(res.data.data)
                    setHaveTossups(true)
                } else {
                    // NO TOSSUPS FOUND
                    setHaveTossups(false)
                }

            })
        } else {
            axios.get(`https://24.199.88.237:8080/api/bonuses?type=quizdb&diffis=[${props.params.difficultyList.join(",")}]&subcats=[${props.params.subcategoryList.join(",")}]&limit=${props.params.num}&searchtype=${props.params.searchType[0]}&searchterm=${search}&tournaments=[${props.params.tournamentList.join(",")}]&random=${props.params.rand ? 1 : 0}`).then((res) => {
                if(res.data.message === "success") {
                    setTossups(res.data.data)
                    setHaveTossups(true)
                } else {
                    // NO TOSSUPS FOUND
                    setHaveTossups(false)
                }

            })
        }




    }, [props.params])

    let search = props.params.searchQuery.length > 0 ? props.params.searchQuery : "QDBNOSEARCH"
    let noTossups = <><div className={"ntu-text"}>No Tossups Found</div> <div className={"ntu-text ntu-sub"}>Try searching with different parameters</div> </>
    let tuList = tossups.length <= 0 ? <div className={"ntu-text"}>Loading...<LoadingCircle /></div> : tossups.map((tu, ind) => <TossupContainer type={props.params.questionType[0]} tossup={tu} num={ind} searchTerm={props.params.searchQuery} />)

    return (

            <div className={"tuVerticalList"}>
                {haveTossups ? tuList : noTossups}
            </div>
    )

}