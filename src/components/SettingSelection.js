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
            <div className={"setting-section-row search-row"}>
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
            <div className={"setting-section-row dropdown-row dropdown-firstrow vis-gt-675"}>
                <CategorySelector callback={setCategories} />
                <SearchTypeSelector callback={setSearchType}/>
                <DifficultySelector callback={setDifficultyList} />
            </div>
            <div className={"setting-section-row dropdown-row vis-gt-675"}>
                <SubcategorySelector callback={setSubcategoryList} categories={categories.map(({name, id}) => id)} />
                <QuestionTypeSelector callback={setQuestionType} />
                <TournamentSelector callback={setTournamentList} difficulties={difficultyList.map(({name, id}) => id)} />
            </div>

          <div className={"setting-section-row dropdown-row dropdown-firstrow vis-lt-675"}>
            <CategorySelector callback={setCategories} />
            <SearchTypeSelector callback={setSearchType}/>

          </div>
          <div className={"setting-section-row dropdown-row vis-lt-675"}>
            <SubcategorySelector callback={setSubcategoryList} categories={categories.map(({name, id}) => id)} />
            <QuestionTypeSelector callback={setQuestionType} />
          </div>
          <div className={"setting-section-row dropdown-row vis-lt-675"}>
            <DifficultySelector callback={setDifficultyList} />
            <TournamentSelector callback={setTournamentList} difficulties={difficultyList.map(({name, id}) => id)} />
          </div>


        </div>
    )
}