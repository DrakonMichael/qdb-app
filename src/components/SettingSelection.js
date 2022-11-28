import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {
    CategorySelector,
    DifficultySelector,
    QuestionTypeSelector,
    SearchTypeSelector,
    SubcategorySelector, TournamentSelector
} from "./DropdownSelectors";
import {useEffect, useState} from "react";

export default function SettingSelection(props) {
    const [categories, setCategories] = useState([])
    const [searchType, setSearchType] = useState([])
    const [difficultyList, setDifficultyList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [questionType, setQuestionType] = useState([])
    const [tournamentList, setTournamentList] = useState([])
    const [searchText, setSearchText] = useState("")

    let remap = (list) => list.map(({name, id}) => id);


    let makeParams = () => {
        return {searchQuery: searchText, categories: remap(categories), searchType: remap(searchType), difficultyList: remap(difficultyList), subcategoryList: remap(subcategoryList), questionType: remap(questionType), tournamentList: remap(tournamentList)}
    }



    return (
        <div className={"setting-section-wrapper"}>
            <div className={"setting-section-row"}>
                <input type={"text"} className={"setting-search-bar"} placeholder={"Search for questions here!"} value={searchText} onChange={event => setSearchText(event.target.value)} />

                <div className={"vert-align"}>
                    <div>
                        <span className={"setting-section-button left-button"} onClick={() => {props.searchCallback(makeParams())}}><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</span>
                        <span className={"setting-section-button right-button"} onClick={() => {props.randomCallback(makeParams())}}>Random</span>
                    </div>
                </div>
            </div>
            <div className={"setting-section-row dropdown-row dropdown-firstrow"}>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Category</div>
                        <div className={"tu-info-data"}>
                            <CategorySelector callback={setCategories} />
                        </div>
                    </div>
                </div>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Search Type</div>
                        <div className={"tu-info-data"}>
                            <SearchTypeSelector callback={setSearchType}/>
                        </div>
                    </div>
                </div>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Difficulty</div>
                        <div className={"tu-info-data"}><DifficultySelector callback={setDifficultyList} /></div>
                    </div>
                </div>
            </div>
            <div className={"setting-section-row dropdown-row"}>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Subcategory</div>
                        <div className={"tu-info-data"}>
                            <SubcategorySelector callback={setSubcategoryList} categories={categories.map(({name, id}) => id)} />
                        </div>
                    </div>
                </div>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Question Type</div>
                        <div className={"tu-info-data"}>
                            <QuestionTypeSelector callback={setQuestionType} />
                        </div>
                    </div>
                </div>
                <div className={"info-box-wrapper"}>
                    <div className={"tu-info-box setting-dropdown-box"}>
                        <div className={"tu-info-header"}>Tournament</div>
                        <div className={"tu-info-data"}>
                            <TournamentSelector callback={setTournamentList} difficulties={difficultyList.map(({name, id}) => id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}