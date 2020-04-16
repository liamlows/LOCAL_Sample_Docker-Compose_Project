import React, { Component } from 'react'

// takes a list calles 'items' as props, displays a table with column header names derived from first object in list.
// If list is empty displays an 'empty table' div

// items: list of objects to be displayed
// tableClass: string of Bootstrap classnames given to table
// emptyMessage: message displayed when items list is empty, disables message when string is empty
// emptyClass: string of Bootstrap classnames given to empty message, defaults to "alert alert-danger" when missing
// showRowHeader: enables or disables automatically numbering rows from 1 to n

// usage:
// <GeneralTable items={[*]} tableClass="*" emptyMessage="*" emptyClass="*" showRowHeader={*true,false*} />

// my use:
/*
<GeneralTable
    items={this.state.items}
    tableClass="table table-bordered table-hover table-sm"
    emptyMessage="Empty Table"
    emptyClass="alert alert-primary"
    showRowHeader={true}
/>
*/

export class GeneralTable extends Component {

    render() {
        if (!this.props.items[0]) {
            return (<>
                {
                    this.props.emptyMessage &&
                    <div className={this.props.emptyClass || "alert alert-danger"}>{this.props.emptyMessage}</div>
                }
            </>)
        } else {
            return (
                <>
                    <table className={this.props.tableClass}>
                        <thead className="thead-light">
                            <tr>
                                {
                                    this.props.showRowHeader && 
                                    <th scope="col">#</th>
                                }
                                {
                                    Object.entries(this.props.items[0]).map(([key, value], j) =>
                                        <th scope="col" key={j}>{key}</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.items.map((item, i) =>
                                    <tr key={i}>
                                        {
                                            this.props.showRowHeader &&
                                            <th scope="row">{i + 1}</th>
                                        }
                                        {
                                            Object.entries(item).map(([key, value], j) =>
                                                <td key={j}>{value}</td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>
            )
        }
    }
}