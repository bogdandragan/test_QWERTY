import React from 'react'
import TableRow from "./TableRow"
import TableHeader from "./TableHeader"

export default class Table extends React.Component{
    constructor(){
        super();
    }

    render(){
        const {users} = this.props;

        const TableRows = users.map((user) => {
            return <TableRow key={user._id} country={user.country} count={user.count}/>
        });

        return (
            <div>
                <h4>Total countries: <strong>{users.length}</strong></h4>
                <table className="table table-bordered">
                    <TableHeader/>
                    <tbody>
                        {TableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}