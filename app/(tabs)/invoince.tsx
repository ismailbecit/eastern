import React from 'react';
import { ScrollView, View, Text, VStack, Heading, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
const Invoince = ({ job, setInvoince }: { job: any, setInvoince: any }) => {
    return (

        <ScrollView style={styles.container}  >
            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 2 }} onPress={() => setInvoince()} />
            <View style={styles.sectionContainer}>
                <VStack space={2} style={styles.sectionHeader}>
                    <Heading size="md" style={styles.text}>Eastern Engineering</Heading>
                    <Text style={styles.text}>1 McPherson St, Banksmeadow NSW 2019</Text>
                    <Text style={styles.text}>Ph: (02) 9316 7620 Fax: (02) 9316 6035</Text>
                    <Text style={styles.text}>Email: accounts@easterneng.com.au</Text>
                    <Text style={styles.text}>ABN: 79 056 469 713</Text>
                </VStack>
                <Heading size="lg" style={styles.text}>JN #{job?.referenceNo}</Heading>
            </View>
            <View style={styles.sectionContainer}>
                <VStack space={2} style={styles.sectionHeader}>
                    <Heading size="sm" style={styles.text}>Invoice To:</Heading>
                    <View>
                        <Text style={styles.text}>{job?.companyId?.companyName}</Text>
                        <Text style={styles.text}>{job?.companyId?.companyAddress}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Project Manager: {`${job?.projectManager?.firstName} ${job?.projectManager?.lastName}`}</Text>
                        <Text style={styles.text}>Requested By: {`${job?.requestedByCustomerId?.firstName} ${job?.requestedByCustomerId?.lastName}`}</Text>
                        <Text style={styles.text}>Phone: {job?.requestedByCustomerId?.phone}</Text>
                        <Text style={styles.text}>Due Date: {job?.dueDate}</Text>
                        {job?.employee && <Text style={styles.text}>Technician: {`${job?.employee?.firstName} ${job?.employee?.lastName}`}</Text>}
                    </View>
                </VStack>
            </View>
            <View style={styles.sectionContainer}>
                <VStack space={2} style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.text}>Purchase Order: {job?.purchaseorder ? job?.purchaseorder : " No Purchase Order Available"}</Text>
                        <Text style={styles.text}>Location: {`${job?.locationId?.address} ${job?.locationId?.state} ${job?.locationId?.suburb} ${job?.locationId?.postcode}`}</Text>
                    </View>
                    <View>
                        {job?.reference && job?.rreferenceNo?.length === 0 && <Text style={styles.text}>Reference: {job?.reference}</Text>}
                        {!job?.reference && job?.rreferenceNo?.length > 0 && <Text style={styles.text}>Reference: {job?.rreferenceNo?.map((item: any, k: number) => (
                            <Text key={"referenceno-" + k}>{`${item.referenceTypeName}${k !== job?.rreferenceNo?.length - 1 ? "," : ""} `}</Text>
                        ))}</Text>}
                        {job?.reference && job?.rreferenceNo?.length > 0 && <Text style={styles.text}>Reference: {job?.reference} {job?.rreferenceNo?.map((item: any, k: number) => (
                            <Text key={"referenceno-" + k}>{`${item.referenceTypeName}${k !== job?.rreferenceNo?.length - 1 ? "," : ""}`}</Text>
                        ))}</Text>}
                        {job?.contractNo && <Text style={styles.text}>Contract No: {job?.contractNo}</Text>}
                        {job?.liftNo && <Text style={styles.text}>Lift No: {job?.liftNo}</Text>}
                        {job?.addtionaldescription?.length > 0 && <Text style={styles.text}>Additional Description: {job?.addtionaldescription}</Text>}
                    </View>
                </VStack>
            </View>

            <View style={styles.sectionContainer} >
                <VStack space={2} style={styles.sectionHeader}>
                    <ScrollView horizontal={true} >
                        <Box alignItems={"center"} justifyContent={"center"}>
                            <Box flexDirection="row" borderBottomWidth={1} >
                                <Box width={120} height={10} justifyContent="center" alignItems="center"   >
                                    <Text style={styles.table.head} >ITEM</Text>
                                </Box>
                                <Box width={120} height={10} justifyContent="center" alignItems="center"  >
                                    <Text style={styles.table.head}>PART NO</Text>
                                </Box>
                                <Box width={120} height={10} justifyContent="center" alignItems="center"  >
                                    <Text style={styles.table.head}>DESCRIPTION</Text>
                                </Box>
                                <Box width={120} height={10} justifyContent="center" alignItems="center"  >
                                    <Text style={styles.table.head}>QTY</Text>
                                </Box>
                            </Box>
                            {job?.parts?.map((part: any, key: number) => (
                                <Box key={"part-" + key} flexDirection="row">
                                    <Box width={"auto"} height={10} justifyContent="center" alignItems="center" >
                                        <Text style={styles.table.col}>{part?.code}</Text>
                                    </Box>
                                    <Box width={120} height={10} justifyContent="center" alignItems="center" >
                                        <Text style={styles.table.col}>{part?.partNo}</Text>
                                    </Box>
                                    <Box width={120} height={10} justifyContent="center" alignItems="center" >
                                        <Text style={styles.table.col}>{part?.description}</Text>
                                    </Box>
                                    <Box width={120} height={10} justifyContent="center" alignItems="center" >
                                        <Text style={styles.table.col}>{part?.quantity}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </ScrollView>
                </VStack>
            </View>

            <View style={styles.sectionContainer}>
                <VStack space={2} style={styles.sectionHeader}>
                    <Heading size="sm" style={styles.text}>Time/Costing is not for each but for all</Heading>
                    <View>
                        <Text style={styles.text}>Estimate:</Text>
                        <Text style={styles.text}>Purchases:</Text>
                        <Text style={styles.text}>Job Time:</Text>
                    </View>
                </VStack>
            </View>
        </ScrollView>



    )
}

export default Invoince

const styles = {
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    sectionContainer: {
        margin: 4,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionHeader: {
        marginBottom: 10,
    },
    text: {
        color: '#4d4b55',
    },
    table: {
        head: {
            fontSize: 14,
        },
        col: {
            fontSize: 12,
            margin: 10
        }
    }
};