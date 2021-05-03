import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import * as Sentry from '@sentry/react-native'
import { AppRegistry, Text, KeyboardAvoidingView, Platform } from 'react-native'
import App from './src/App'
import { backgroundTracking } from './src/services/background-tracking'
import BackgroundGeolocation from './src/react-native-background-geolocation'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false
KeyboardAvoidingView.defaultProps.behavior =
  Platform.OS === 'ios' ? 'padding' : null


// Make BackgroundGeolocation API global for handy access in Javascript Debugger console
global.BackgroundGeolocation = BackgroundGeolocation

import BackgroundFetch from 'react-native-background-fetch'

AppRegistry.registerComponent('ThaiAlert', () => App)

/**
 * BackgroundGeolocation Headless JS task.
 * For more information, see:  https://github.com/transistorsoft/react-native-background-geolocation/wiki/Android-Headless-Mode
 */

let BackgroundGeolocationHeadlessTask = async (event) => {
  let params = event.params
  console.log('[BackgroundGeolocation HeadlessTask] -', event.name, params)

  if (event.name == 'heartbeat') {
      // Use await for async tasks
      let location = await backgroundTracking.getLocation({
        samples: 1,
        persist: false,
        extras: {
          triggerType: 'headlessTask',
        },
      })
      console.log(
        '[BackgroundGeolocation HeadlessTask] - getCurrentPosition:',
        location,
      )
}

BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask)

/**
 * BackgroundFetch Headless JS Task.
 * For more information, see:  https://github.com/transistorsoft/react-native-background-fetch#config-boolean-enableheadless-false
 */
let BackgroundFetchHeadlessTask = async (event) => {
  console.log('[BackgroundFetch HeadlessTask] start')

  console.log('[BackgroundFetch HeadlessTask] finished')

  BackgroundFetch.finish()
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask)
