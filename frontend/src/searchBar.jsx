import React, { Component } from 'react'
import { GeneralTable } from './generalTable'

// Takes in labelName, placeholderText and onSearch as props
// labelName is the name of the label for the search bar
// placeholderText is the placeholder inside of the bar
// onSearch is a function with a single parameter that is called when the submit button is pressed, the contents of the search bar are passed as a parameter, and the result returned by the function is used to populate a table

export class SearchBar extends Component {

    state = {
        items: [],
        searchText: ""
    }

    render() {
        return (
            <>
                <form class="m-4">
                    <div class="form-group">
                        <label for="textInput">{this.props.labelName}</label>
                        <input type="text"
                            className="form-control"
                            id="textInput"
                            placeholder={this.props.placeholderText}
                            value={this.state.searchText}
                            onChange={e => this.setState({ searchText: e.target.value })}
                        ></input>
                    </div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            this.setState({
                                items: this.props.onSearch(this.state.searchText),
                                searchText: ""
                            })
                        }}
                    >Search</button>
                </form>
                <GeneralTable
                    items={this.state.items}
                    tableClass="table table-bordered table-hover table-sm"
                    emptyMessage="Empty Table"
                    emptyClass="alert alert-primary"
                    showRowHeader={true}
                />
            </>
        )
    }
}
