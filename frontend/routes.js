import { createStackNavigator } from '@react-navigation/native';
import { ProfileUser } from './views/ProfileUser'
import { App } from './App'

export default createStackNavigator(
    {
        ProfileUser,
    }, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'FFF',
        },
        headerTintColor: '000'
    },
});