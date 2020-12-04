import AsyncStorage from '@react-native-async-storage/async-storage'

const auth = {
    async getUserData() {
        const ret = await AsyncStorage.getItem('user')
        if (ret === null || ret === undefined) {
            throw null
        }
        return ret
    }
}

export default auth