const tournamentMapping = require("../mappings/tournamentMapping.json")
const categoryMapping = require("../mappings/categoryMapping.json")
const subcatMapping = require("../mappings/subcategoryMapping.json")

export function TournamentIDToName(props) {
    return <>{tournamentMapping.forwards[props.id].name}</>
}

export function CategoryIDToName(props) {
    if(categoryMapping.forwards[props.id]) {
        return <>{categoryMapping.forwards[props.id]}</>
    }

    return <>UNKNOWN</>
}

export function SubcategoryIDToName(props) {
    if(subcatMapping.forwards[props.id]) {
        return <>{subcatMapping.forwards[props.id].name}</>
    }

    return <>UNKNOWN</>
}