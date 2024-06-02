import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Heading from '../components/Heading';
import AppButton from '../components/AppButton';
import colors from '../constants/Colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { updateUserProfile } from '../service/authService';
import { useSelector } from 'react-redux';

const UpdateUserProfileScreen = () => {
  const [userName, setUserName] = useState(data?.name || '');
  const [password, setPassword] = useState('');
  const route = useRoute();
  const { data } = route.params || {};
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.authenticationKey);
  useEffect(() => {
    if (data) {
      setUserName(data.name);
    }
  }, [data]);

  const handleCancel = () => {
    setUserName('');
    setPassword('');
  };

  const cancelHandler = () => {
    navigation.navigate("UserProfile", {data});
  }

  const confirmHandler = async(name, password) => {
        const res = await updateUserProfile({token, name, password});
        if (res.status === "OK") {
            Alert.alert("Username and Password updated successfully.")
            data.name = res.name;
            navigation.navigate("UserProfile", {data});
        } else if(res.status === "error") {
            Alert.alert(data.message);
        }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Heading title="User Profile"/>
      <View style={styles.form}>
        <Text style={styles.label}>New User Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <AppButton title="Confirm" icon="checkmark" color="white" onPress={()=> confirmHandler(userName, password)}/>
            </View>
            <View style={styles.button}>
                <AppButton icon="close" title="Cancel" color="white" onPress={cancelHandler}/>
            </View>
        </View>
            
         
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#007AFF',
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.backButtonBackgroundColour,
    padding: 10,
    borderRadius: 8
},
buttonContainer: {
    flexDirection:'row', 
    justifyContent: 'space-evenly', 
    margin: 20
}
});

export default UpdateUserProfileScreen;
