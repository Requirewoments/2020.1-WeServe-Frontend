import React, { Component, useContext, useState } from 'react'
import {Text, TextInput, View} from 'react-native'
import UserContext from '../context/UserContext'


export default props => {
    const { state } = useContext(UserContext)
    const { user } = state
    const new_user = useState(user)
    return (
        <View>
            <TextInput
                value={new_user.name}
                onChangeText={(text) => {
                    console.warn(new_user.name)
                    return text
                }}
            />
        </View>
    )
}