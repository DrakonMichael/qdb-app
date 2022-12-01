import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {
    CategorySelector,
    DifficultySelector,
    QuestionTypeSelector,
    SearchTypeSelector,
    SubcategorySelector, TournamentSelector
} from "./DropdownSelectors";
import {useEffect, useRef, useState} from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(buttonRef, listRef, func) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (buttonRef.current && listRef.current && !listRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        func()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef, buttonRef, func]);
}


export default function SettingSelection(props) {
    const [categories, setCategories] = useState([])
    const [searchType, setSearchType] = useState([])
    const [difficultyList, setDifficultyList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [questionType, setQuestionType] = useState([])
    const [tournamentList, setTournamentList] = useState([])
    const [searchText, setSearchText] = useState("")

    const [dropDownOpen, setDropDownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const listRef = useRef(null)
    useOutsideAlerter(dropdownRef, listRef, () => {setDropDownOpen(false)});



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
                      <div className="qnum-container">
                        <span className={"setting-section-button right-button"} onClick={() => {setDropDownOpen(!dropDownOpen)}} ref={dropdownRef}>Random</span>
                          {dropDownOpen ?
                            <div className="qnum-dropdown" ref={listRef}>
                              <ul>
                                <li onClick={() => {setDropDownOpen(false); props.randomCallback(makeParams(), 5)}}>5 Questions</li>
                                <li onClick={() => {setDropDownOpen(false); props.randomCallback(makeParams(), 10)}}>10 Questions</li>
                                <li onClick={() => {setDropDownOpen(false); props.randomCallback(makeParams(), 25)}}>25 Questions</li>
                                <li onClick={() => {setDropDownOpen(false); props.randomCallback(makeParams(), 100)}}>100 Questions</li>
                                <li onClick={() => {setDropDownOpen(false); props.randomCallback(makeParams(), 500)}}>500 Questions</li>
                              </ul>
                            </div>
                          :
                          <></>}
                      </div>
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