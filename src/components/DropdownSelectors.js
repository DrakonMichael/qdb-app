import {useEffect, useState} from "react";
import Multiselect from 'multiselect-react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";


const categoryMapping = require("../mappings/categoryMapping.json")
const subcatMapping = require("../mappings/subcategoryMapping.json")
const tournamentMapping = require("../mappings/tournamentMapping.json")


const msStyle = {
    chips: {
        background: '#ddd',
        color: '#222',
        borderRadius: '3px',
        fontWeight: 'bold'
    }
}

const closeIcon = <span className={"select-x"}><FontAwesomeIcon icon={faXmark}/></span>

export function DropdownWrapper(props) {
  return (
    <div className={"info-box-wrapper"}>
      <div className={"tu-info-box setting-dropdown-box"}>
        <div className={"tu-info-header"}>{props.text}</div>
        <div className={"tu-info-data"}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export function CategorySelector(props) {
    const [categories, setCategories] = useState([])

    useEffect(() => {

        let options = Object.keys(categoryMapping.forwards).map(key => {return {name: categoryMapping.forwards[key], id: parseInt(key)}})

        setCategories(options)
    }, [])


    return (
      <DropdownWrapper text={"Category"}>
        <Multiselect
            options={categories} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
            style={msStyle}
            onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            customCloseIcon={closeIcon}
        />
      </DropdownWrapper>
    )
}

export function SearchTypeSelector(props) {
    const [options, setOptions] = useState([])

    useEffect(() => {

        let options = [{name: "Question", id: 0}, {name: "Answer", id: 1}]

        setOptions(options)
    }, [])


    return (
        <DropdownWrapper text={"Search Type"}>
        <Multiselect
            options={options} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
            style={msStyle}
            onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            customCloseIcon={closeIcon}
            singleSelect
        />
        </DropdownWrapper>
    )
}

export function DifficultySelector(props) {
    const [options, setOptions] = useState([])

    useEffect(() => {

        let options = [{name: "1 (Middle School)", id: 1}, {name: "2 (Easy High School)", id: 2}, {name: "3 (Regular High School)", id: 3}, {name: "4 (Hard High School)", id: 4},
            {name: "5 (National High School)", id: 5}, {name: "6 (Easy College)", id: 6}, {name: "7 (Regular College)", id: 7}, {name: "8 (Hard College)", id: 8}, {name: "9 (Open)", id: 9}]

        setOptions(options)
    }, [])


    return (
        <DropdownWrapper text={"Difficulty"}>
          <Multiselect
              options={options} // Options to display in the dropdown
              displayValue="name" // Property name to display in the dropdown options
              style={msStyle}
              onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              customCloseIcon={closeIcon}
          />
        </DropdownWrapper>
    )
}

// Props.categories contains which categories they must be a part of
export function SubcategorySelector(props) {
    const [categories, setCategories] = useState([])

    useEffect(() => {

        let getcatstring = (subcatKey) => {
            let cat_id = subcatMapping.forwards[subcatKey].category_id;
            return categoryMapping.forwards[cat_id];
        }

        let options = Object.keys(subcatMapping.forwards).map(key => {return {name: subcatMapping.forwards[key].name, id: parseInt(key), categoryString: getcatstring(key)}})



        if(props.categories.length > 0) {
            options = options.filter(({name, id}) => {
                let cat = subcatMapping.forwards[id].category_id;
                return props.categories.includes(cat)
            })
        }

        setCategories(options)
    }, [props.categories])


    return (
        <DropdownWrapper text={"Subcategory"}>
        <Multiselect
            options={categories} // Options to display in the dropdown
            groupBy={"categoryString"}
            displayValue="name" // Property name to display in the dropdown options
            style={msStyle}
            onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
            customCloseIcon={closeIcon}
        />
        </DropdownWrapper>
    )
}

export function QuestionTypeSelector(props) {
    const [options, setOptions] = useState([])

    useEffect(() => {

        let options = [{name: "Tossup", id: 0}, {name: "Bonus", id: 1}]

        setOptions(options)
    }, [])



    return (
        <DropdownWrapper text={"Question Type"}>
          <Multiselect
              options={options} // Options to display in the dropdown
              displayValue="name" // Property name to display in the dropdown options
              style={msStyle}
              onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              customCloseIcon={closeIcon}
              singleSelect
          />
        </DropdownWrapper>
    )
}


// Takes tournament difficulty
export function TournamentSelector(props) {
    const [options, setOptions] = useState([])
    useEffect(() => {

        let op = Object.keys(tournamentMapping.forwards).map(key => {return {name: tournamentMapping.forwards[key].name, id: parseInt(key), year: tournamentMapping.forwards[key].year}})

        if(props.difficulties.length > 0) {
            op = op.filter(({name, id}) => {
                let diff = tournamentMapping.forwards[id].difficulty;
                return props.difficulties.includes(diff)
            })
        }

        setOptions(op)
    }, [props.difficulties])


    return (
        <DropdownWrapper text={"Tournament"}>
          <Multiselect
              options={options} // Options to display in the dropdown
              groupBy={"year"}
              displayValue="name" // Property name to display in the dropdown options
              style={msStyle}
              onSelect={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              onRemove={(selectedList, selectedItem) => {props.callback([...selectedList])}}
              customCloseIcon={closeIcon}
          />
        </DropdownWrapper>
    )
}