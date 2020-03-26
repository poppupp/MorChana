import React, { useState } from 'react'
import { MockScreen } from '../MockScreen'
import { useNavigation } from 'react-navigation-hooks'
import { MyBackground } from '../../covid/MyBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  StatusBar,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS, FONT_FAMILY } from '../../styles'
import { PrimaryButton } from '../../components/Button'
import OtpInputs from 'react-native-otp-inputs'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { BackButton } from '../../components/BackButton'

export const AuthOTP = () => {
  const navigation = useNavigation()
  const [otp, setOtp] = useState('')
  
  return (
    <MyBackground>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ padding: 16 }}>
          <BackButton/>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>กรอกรหัสจาก SMS</Text>
          <Text style={styles.subtitle}>
            ส่งไปที่เบอร์ {navigation.state.params.phone}
          </Text>
        </View>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: 280,
              maxWidth: '100%',
            }}
          >
            <OtpInputs
              keyboardType={'phone-pad'}
              inputContainerStyles={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 4,
                flex: 1,
                margin: 4,
                height: 60,
              }}
              inputStyles={{ textAlign: 'center', fontSize: 32 }}
              handleChange={code => setOtp(code)}
              numberOfInputs={4}
            />
          </View>
          <TouchableOpacity
            onPress={() => console.log('renew otp')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            <AntIcon name="reload1" size={24} color={COLORS.PRIMARY_LIGHT} />
            <Text style={styles.text}>ส่งรหัสใหม่</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            disabled={otp.length !== 4}
            title={'ถัดไป'}
            onPress={() => {
              navigation.navigate('OnboardingFace')
            }}
          />
        </View>
      </SafeAreaView>
    </MyBackground>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  text: {
    fontFamily: FONT_FAMILY,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 32,
    marginLeft: 8,
    color: COLORS.PRIMARY_LIGHT,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 40,
    alignItems: 'center',
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.RED,
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    alignItems: 'center',
    color: COLORS.GRAY_2,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  agreement: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.PRIMARY_DARK,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 16,
  },
})
