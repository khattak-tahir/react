import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../layouts/profile.layout';
import Settings from '../layouts/settings.layout';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
// import { BottomNav } from '../common/bottomNavbar';
// import TimeTable from '@mikezzb/react-native-timetable';
import Main from '../screens/main';
import Teachers from '../layouts/teachers.layout';
import Courses from '../layouts/courses.layout';
import Contact from '../layouts/contact.layout';


const Stack = createNativeStackNavigator();

export function MyNativeStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
    <Stack.Screen name="Welcome_Screen" component={Welcome} />
    <Stack.Screen name="Login_Screen" component={Login} />
    <Stack.Screen name="Main_Screen" component={Main} />
    <Stack.Screen name="Teachers_Screen" component={Teachers} />
    <Stack.Screen name="Courses_Screen" component={Courses} />
    <Stack.Screen name="Contact_Screen" component={Contact} />
    <Stack.Screen name="Settings_Screen" component={Settings} />
    <Stack.Screen name="Profile" component={Profile} />  




    </Stack.Navigator>
    </NavigationContainer>
  );
}