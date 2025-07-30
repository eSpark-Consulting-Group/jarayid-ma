import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubscriptionCard from '../components/SubscriptionCard';
import { CustomText } from '../components';

const SubscriptionScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <CustomText
                fontFamily="Gilroy-SemiBold"
                style={styles.headerText}
            >
                Subscribe Jarayid Plus
            </CustomText>
            <View style={styles.cardsContainer}>
                <SubscriptionCard
                    title="Basic Subscription"
                    description="Get Ad Free Experience While you are Reading your Favourite articles."
                    price="$9.99"
                    onPress={() => console.log('Upgrade Now clicked!')}
                />
                <SubscriptionCard
                    title="Basic Subscription"
                    description="Get Ad Free Experience While you are Reading your Favourite articles."
                    price="$9.99"
                    onPress={() => console.log('Upgrade Now clicked!')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 23,
        marginVertical: 20,
        textAlign: 'left',
        paddingHorizontal: 20,
    },
    cardsContainer: {
        gap: 20,
    },
});

export default SubscriptionScreen;