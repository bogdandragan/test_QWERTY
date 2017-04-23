import React from 'react'
import { connect } from 'react-redux'
import { sortUsers } from "../actions/usersActions"
import '../../assets/bootstrap/css/bootstrap.min.css'

@connect((store) => {
    return {
        users: store.users.users,
        sortOrder: store.users.sortOrder
    };
})
export default class TableHeader extends React.Component{
    constructor(){
        super();
    }

    handleSort(columnType) {
        this.props.dispatch(sortUsers(columnType))
    }

    render(){
        const style = {
            cursor: 'pointer',
            textDecoration: 'underline'
        };

        return(
            <thead>
                <tr>
                    <th onClick={() => this.handleSort('country')} style={style}>Country
                        <span className={'glyphicon ' + ((this.props.sortOrder == 'asc') ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-top')}></span>
                    </th>
                    <th onClick={() => this.handleSort('count')} style={style}>Count
                        <span className={"glyphicon " + ((this.props.sortOrder == 'asc') ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-top')}></span>
                    </th>
                </tr>
            </thead>
        );
    }
}