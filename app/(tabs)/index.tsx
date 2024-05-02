import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, VStack, Heading, Button, Spinner } from 'native-base';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CameraView, Camera } from "expo-camera/next";
import axios from "axios"
import Invoince from './invoince';
const InvoiceScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showInvoince, setShowInvoince] = useState(false);
  const { width, height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const [job, setJob] = useState<any>({})

  useEffect(() => {
    getCameraPermissions()
  }, [])

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted" ? true : false);
  };

  const handleBarCodeScanned = async ({ type, data }: any) => {
    getCameraPermissions();
    setScanned(false);
    setLoading(true)
    if (!hasPermission) {
      alert("camera access error")
    }
    const id = data && data.split("/")[data.split("/")?.length - 1]
    await axios.get(`https://eastern.test.dev-api.easternengapp.com/api/orders/${id}/find`)
      .then((res) => {
        if (res.data?.success) {
          setJob(res.data.data[0])
          setShowInvoince(id)
        } else {
          alert(res?.data?.msg)
        }
      })
      .catch(() => alert("Server error")).finally(() => setLoading(false))
  };
  return (
    <>
      {loading && (
        <View background={"white"} height={"full"} width={"full"} justifyContent={"center"} >
          <Spinner />
        </View >
      )}
      {!loading && showInvoince ? <Invoince job={job} setInvoince={setShowInvoince} /> : (
        <ScrollView background={"white"}>
          <View alignItems={"center"} >
            <View margin={8} mb={2}>
              <VStack space={2} width={width / 1.2} margin={10} height={160} background={"gray.100"} borderRadius={10} alignItems={"center"} p={5} >
                <Heading>Scan QR Code</Heading>
                <Text textAlign={"center"}>Lorem ipsum denemerem ipsum den
                  eme mes rem ipsum deneme mes rem ipsum deneme mes</Text>
              </VStack>
            </View>
            <VStack space={32} alignItems={"center"}>
              {scanned ? <View borderRadius={100} width={200} height={200} mt={8}>
                <CameraView
                  onBarcodeScanned={scanned ? handleBarCodeScanned : undefined}
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                  }}
                  style={StyleSheet.absoluteFill}
                />
              </View> : (
                <AntDesign name="qrcode" size={250} color="black" />
              )}
              <Button onPress={() => setScanned(!scanned)} width={250} borderRadius={100} variant={"outline"} borderColor={"info.500"}>
                {!scanned ? "scan qr screen" : "cancel"}
              </Button>
            </VStack>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default InvoiceScreen; 