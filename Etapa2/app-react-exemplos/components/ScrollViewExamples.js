import React, { Component} from "react";
import {View, Text, Image, ScrollView, StyleSheet } from 'react-native';

class ScrollViewExample extends Component {
    state = {
        names: [
            { 'name': 'Elijah', 'id': 1},
            { 'name': 'Susan', 'id':2},
            { 'name': 'Tyler', 'id':3},
            { 'name': 'Kol', 'id':4},
            { 'name': 'Stefan', 'id':5},
            { 'name': 'Damon', 'id':6},
            { 'name': 'Elena', 'id':7},
            { 'name': 'Bonnie', 'id':8},
            { 'name': 'Katherine', 'id':9},
            { 'name': 'Caroline', 'id':10},
            { 'name': 'Klaus', 'id':11},
            { 'name': 'Rebekah', 'id':12},
        ]
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View
                            key={item.id}
                            style={styles.item}
                            >
                                <Image source={require('../assets/favicon.png')} />
                                <Text>{item.name}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

export default ScrollViewExample;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alingItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});