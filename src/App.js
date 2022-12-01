import logo from './logo.svg';
import './App.css';
import TossupList from "./components/TossupList";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import SettingSelection from "./components/SettingSelection";
import {useEffect, useState} from "react";

const categoryMapping = require("./mappings/categoryMapping.json")
const subcategoryMapping = require("./mappings/subcategoryMapping.json")

function App() {

    let initialParams = () => {
        return {searchQuery: "", categories: [], searchType: [], difficultyList: [], subcategoryList: [], questionType: [], tournamentList: [], num: 50, noRender: true}
    }

    const [params, setParams] = useState(initialParams())

    useEffect(() => {
        fixParams(initialParams())
    }, [])

    let srcCallback = (p) => {
        fixParams({...p, num: 50, rand: false})
    }

    let rndCallback = (p, count) => {
        fixParams({...p, num: count, rand: true})

    }

    const fixParams = (givenParams) => {
        let pUpdate = {}
        if(givenParams.categories.length <= 0) {
            // No categories selected, populate with all.
            pUpdate.categories = Object.keys(categoryMapping.forwards).map((key) => parseInt(key))
        }

        if(givenParams.subcategoryList.length <= 0) {
            // No subcategories selected
            //const clist = givenParams.categories.map(({name, id}) => id)


            pUpdate.subcategoryList = Object.keys(subcategoryMapping.forwards).map((key) => parseInt(key))
            if(givenParams.categories.length > 0) {
                pUpdate.subcategoryList = pUpdate.subcategoryList.filter((id) => {
                    return givenParams.categories.includes(subcategoryMapping.forwards[id].category_id);
                })
            }


        }

        if(givenParams.difficultyList.length <= 0) {
            pUpdate.difficultyList = [1,2,3,4,5,6,7,8,9];
        }

        if(givenParams.searchType.length <= 0) {givenParams.searchType = [ 0 ]}
        if(givenParams.questionType.length <= 0) {givenParams.questionType = [ 0 ]}

        setParams(() => ({...givenParams, ...pUpdate}))
    }


    let tuList = params.noRender ? <></> : <TossupList params={params} />

  return (
    <div className="App">
      <div className={"col-display"}>
        <NavBar />
          <div className={"tuListContainer"}>
              <SettingSelection searchCallback={srcCallback} randomCallback={rndCallback}/>
              {tuList}
          </div>


        <FooterBar />
      </div>

    </div>
  );
}

export default App;
