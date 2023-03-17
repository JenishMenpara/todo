import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNewTodo} from '../Redux/Action';
import ShowTodoList from '../Componets/ShowTodoList';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Octicons';

const MainScreen = () => {
  const todos = useSelector(state => state?.TodoReducer?.todos);
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleAddTodo = () => {
    if (todoText !== '') {
      console.log(todoIsPresrent(todoText));
      if (todoIsPresrent(todoText)) {
        dispatch(addNewTodo(todoText));
        setTodoText('');
      } else {
        console.log('todo he');
        setDialogVisible(true);
      }
    }
  };

  const todoIsPresrent = text => {
    let presrentTodo = todos.filter(todo => todo?.title === text);
    if (presrentTodo.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleText = e => {
    setTodoText(e);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.mainContainer}>
      {/* <View > */}
      <View style={styles.topContainer}>
        <View style={styles.TextShowConatiner}>
          <Text style={styles.todoText}>to.do</Text>
          <View style={styles.taskDoneContainer}>
            <Text>You have</Text>
            <Text>{todos.length} tasks</Text>
          </View>
        </View>
      </View>
      <View style={styles.TextinputContainer}>
        <TextInput
          value={todoText}
          style={styles.input}
          onChangeText={handleText}
          placeholder="Add todo..."
          placeholderTextColor={'#babac0'}
        />
        <TouchableOpacity style={styles.addTodoButton} onPress={handleAddTodo}>
          <Icon name="chevron-right" size={30} color="#babac0" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={todos}
          keyExtractor={({item}) => item?.id}
          renderItem={({item}) => <ShowTodoList item={item} />}
        />
      </View>
      <ConfirmDialog
        title="Task already registered"
        message="You can not registered task with same name"
        visible={dialogVisible}
        onTouchOutside={() => setDialogVisible(false)}
        positiveButton={{
          title: 'ok',
          onPress: () => setDialogVisible(false),
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#728FCE',
  },

  bottomContainer: {
    flex: 7,
  },
  TextShowConatiner: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  todoText: {
    fontSize: 25,
    fontWeight: '500',
  },
  taskDoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
    color: '#000000',
    borderWidth: 0,
    borderRadius: 5,
    marginRight: 0,
  },
  TextinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: -40,
    backgroundColor: '#728FCE',
    width: '100%',
  },
  addTodoButton: {
    borderWidth: 0,
    height: 50,
    width: 40,
    padding: 9,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
