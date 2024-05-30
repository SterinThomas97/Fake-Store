import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Heading from "./Heading";
import { useRoute } from '@react-navigation/native';
import AppButton from "./AppButton";
import colors from "../constants/Colors";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const  UserProfile = () => {
    const route = useRoute();
    console.log("route.params",route.params);
    const { data } = route.params;
    const isAuthenticated = useSelector((state) => !!state.auth.authenticationKey);
    const dispatch = useDispatch();
    
    const navigation = useNavigation();

    const signOutHandler = () => {
        dispatch(logout());
        //navigation.navigate("SignInScreen");
        
    }

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Inside useEffect of userprofile screen")
          navigation.navigate('SignInScreen');
        }
      }, [isAuthenticated, navigation]);
      
    const updateHandler = () => {
        navigation.navigate("UpdateUserProfileScreen", {data});
    }
    return(
    <SafeAreaView style={{flex: 1}}>
        <Heading title="User Profile"/>
        <View style={styles.usernameContainer}>
            <View style={styles.userValue}>
                <Text style={styles.userName}>User Name:</Text>
            </View>
            <View style={styles.userValue}>
                {data ? (<Text style={styles.userNameValue}>{data.name}</Text>) : ""}
            </View>
        </View>
        <View style={styles.usernameContainer}>
            <View style={styles.userValue}>
                <Text style={styles.userName}>Email:</Text>
            </View>
            <View style={styles.userValue}>
                {data ? (<Text style={styles.userNameValue}>{data.email}</Text>) : ""}
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <AppButton icon="color-wand" title="Update" color="white" onPress={updateHandler}/>
            </View>
            <View style={styles.button}>
                <AppButton icon="exit" title="Sign Out" color="white" onPress={signOutHandler}/>
            </View>
        </View>
    </SafeAreaView>);
}
export default UserProfile;

const styles = StyleSheet.create({
    usernameContainer: {
        flexDirection: 'row',
        alignContent:'space-between',
        marginHorizontal: 70
    },
    userValue: {
        padding: 10
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 17
    },
    userNameValue: {
        
        fontSize: 17
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
})