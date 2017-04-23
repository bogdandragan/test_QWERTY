const initialState = {
    users: [],
    fetching: false,
    fetched: false,
    sortOrder: '',
    error: null,
    importVK : {fetching: false, fetched: false, error: null, result: ""}
};

function compareValues(column, order) {
    return function(a, b) {
        if(!a.hasOwnProperty(column) || !b.hasOwnProperty(column)) {
            return 0;
        }

        const varA = (typeof a[column] === 'string') ?
            a[column].toUpperCase() : a[column];
        const varB = (typeof b[column] === 'string') ?
            b[column].toUpperCase() : b[column];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'asc') ?  comparison : (comparison * -1)
        );
    };
}

export default function users(state=initialState, action){
    switch (action.type){
        case "FETCH_USERS_BEGIN":{
            return {...state, fetching: true}
        }
        case "FETCH_USERS_FULFILLED":{
            return {...state, fetching: false, fetched: true, users:action.payload}
        }
        case "FETCH_USERS_REJECTED":{
            return {...state, fetching: false, fetched: false, error:action.payload}
        }
        case "IMPORT_VK_USERS_BEGIN":{
            return {...state, importVK: {fetching: true, fetched: false}}
        }
        case "IMPORT_VK_USERS_FULFILLED":{
            console.log(action.payload);
            return {...state, importVK: {fetching: false, fetched: true, result: action.payload}}
        }
        case "IMPORT_VK_USERS_REJECTED":{
            console.log(action.payload);
            return {...state, importVK: {fetching: false, fetched: false, error: action.payload}}
        }
        case "SORT_USERS":{
            var sortedUsers = state.users.slice(0);
            sortedUsers.sort(compareValues(action.payload.columnType, state.sortOrder));
            return {...state, users: sortedUsers, sortOrder: (state.sortOrder == 'asc')?'desc':'asc'}
        }

    }
    console.log(state);
    return state;

}
