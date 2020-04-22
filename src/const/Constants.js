import { Demension, Platform } from 'react-native'

let headerHeight = Platform.OS === 'ios' ? 66 : 46
let footerHeight = 55

const Constants = {
    headerHeight: headerHeight,
    footerHeight: footerHeight,
    viewHeight: Demension.get('window').height - headerHeight,
    screenHeight: Demension.get('window').height,
    screenWidth: Demension.get('window').width
}

export default Constants
