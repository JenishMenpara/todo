import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const MainScreen = () => {
  const todos = useSelector(state => state?.TodoReducer?.todos);
  //   https://programmingfields.com/how-to-create-react-todo-app-using-redux-for-beginners/
  console.log(todos);
  return (
    <View>
      <Text>MainScreen</Text>
      <Text>MainScreen</Text>
      <Text>MainScreen</Text>
      <Text>MainScreen</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
