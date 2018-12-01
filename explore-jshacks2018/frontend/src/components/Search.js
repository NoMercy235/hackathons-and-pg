import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Search as IconSearch } from '@material-ui/icons';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { location: '' };
    }

    render() {
        return (
            <div className='ex-search-container'>
                <Card className='ex-search'>
                    <CardContent>
                        <TextField
                            id="location"
                            label="Location"
                            type="text"
                        />
                        <TextField
                            id="departure"
                            label="Departure"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="returning"
                            label="Returning"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <IconSearch className="ex-search-icon" onClick={() => this.props.onSearch(this.state)} />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Search;
