import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    midContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        padding: 3,
        marginBottom: 20,
        borderRadius: 5,
        borderColor: '#000',
        // borderWidth: 20,
    },
    button: {
        backgroundColor: '#ee2f25',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 40,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginBottom: 20,
    }
});

export default styles