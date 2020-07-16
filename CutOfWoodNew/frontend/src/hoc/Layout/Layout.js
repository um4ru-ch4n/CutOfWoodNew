import React from 'react';
import classes from './Layout.css';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';

class Layout extends React.Component {
    render() {
        return (
            <div className={classes.Layout}>
                <Header />
                
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}


export default connect()(Layout);