import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';

import DatePicker from 'react-native-datepicker'

let common = require('./CommonData');
let SQLite = require('react-native-sqlite-storage');

export default class CreateScreen extends Component {
  static navigationOptions = {
    title: 'Add Movie',
  };

  constructor(props) {
    super(props)

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    this.state = {
      title: '',
      language: '03',
      release_date: date,
    };

    this._insert = this._insert.bind(this);

    this.db = SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }

  _insert() {
    this.db.transaction((tx) => {
      tx.executeSql('INSERT INTO movies(title,language,release_date) VALUES(?,?,?)', [
        this.state.title,
        common.getValue(common.languages, this.state.language),
        new Date(this.state.release_date).getTime() / 1000,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InputWithLabel style={styles.input}
          label={'Movie Title'}
          value={this.state.title}
          onChangeText={(title) => {this.setState({title})}}
          orientation={'vertical'}
        />
        <PickerWithLabel style={styles.picker}
          label={'Language'}
          items={common.languages}
          mode={'dialog'}
          value={this.state.language}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({language: itemValue})
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <Text>Release Date</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.release_date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2010-01-01"
          maxDate="2030-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({release_date: date})}}
        />
        <AppButton style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});