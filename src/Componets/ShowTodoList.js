import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteTodo, updateTodo} from '../Redux/Action';
import CheckBox from '@react-native-community/checkbox';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/AntDesign';

const ShowTodoList = props => {
  const {item} = props;

  const dispatch = useDispatch();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = item => {
    setIsEdit(true);
    setNewTodoText(item?.title);
  };
  const handleText = e => {
    setNewTodoText(e);
  };

  const updateTodoText = id => {
    setIsEdit(false);
    dispatch(updateTodo(id, newTodoText));
    setDialogVisible(false);
  };

  return (
    <View style={styles.mainConatner}>
      <View style={styles.todoConatiner}>
        <CheckBox
          disabled={false}
          tintColors={true ? 'green' : '#babac0'}
          onCheckColor="red"
          onFillColor="green"
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        {isEdit ? (
          <TextInput
            value={newTodoText}
            onChangeText={handleText}
            style={styles.input}
          />
        ) : (
          <Text style={toggleCheckBox ? styles.taskDone : styles.taskNotDOne}>
            {item?.title}
          </Text>
        )}
      </View>
      <View style={styles.todoEditDelet}>
        {isEdit ? (
          <TouchableOpacity onPress={() => updateTodoText(item?.id)}>
            <Text>ADD</Text>
          </TouchableOpacity>
        ) : (
          <>
            {toggleCheckBox ? null : (
              <TouchableOpacity onPress={() => handleEditTodo(item)}>
                <Icon name="edit" size={25} color="#babac0" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setDialogVisible(true)}>
              <Icon name="delete" size={25} color="#babac0" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <ConfirmDialog
        title="Remove Item"
        message="Are you sure you want to remove item"
        visible={dialogVisible}
        onTouchOutside={() => setDialogVisible(false)}
        positiveButton={{
          title: 'ok',
          onPress: () => handleDeleteTodo(item?.id),
        }}
        negativeButton={{
          title: 'NO',
          onPress: () => setDialogVisible(false),
        }}
      />
    </View>
  );
};

export default ShowTodoList;

const styles = StyleSheet.create({
  mainConatner: {
    backgroundColor: '#babac0',
    marginVertical: 10,
    height: 55,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoEditDelet: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 3,
  },
  deleteButton: {},
  input: {
    color: '#000',
    height: 30,
    width: '70%',
    borderBottomWidth: 1,
    padding: 5,
  },

  taskDone: {
    color: 'green',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  taskNotDOne: {
    color: '#000000',
  },
});
