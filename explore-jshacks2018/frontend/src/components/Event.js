import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

function random1Or2() {
    return +((Math.random() * 10).toFixed(0)) % 2 + 1;
}

class Event extends Component {
    render() {
        return (
            <Card className='ex-event'>
                <CardContent>
                    <h3>{this.props.event.name}</h3>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <small>Location: London</small>
                        <small>Date: 12/0{random1Or2()}/2018</small>
                    </div>
                </CardContent>
                <CardActions>
                    <div className={`ex-auth-buttons`}>
                        <Button variant="contained" color="primary">
                            View info
                        </Button>
                        <Button variant="contained" color="primary">
                            Attend
                        </Button>
                    </div>
                </CardActions>
            </Card>
        );
    }
}

export default Event;
