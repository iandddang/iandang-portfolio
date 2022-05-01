
export default {
    container: {
        minHeight: '300px',
        maxWidth: '100%', // Fill parent before overflowing
        maxHeight: '100%', // Fill parent before overflowing
        borderRadius: '5px',
        overflow: 'auto',
        cursor: 'text',
        backgroundColor: '#212121',
        backgroundSize: 'cover'
    },
    content: {
        padding: '20px',
        height: '100%',
        fontSize: '13px',
        color: '#FFFFFF',
        fontFamily: 'monospace',
        textAlign: 'left',
        whiteSpace: 'pre-line',
    },
    footer: {
        padding: '20px',
        fontSize: '8px',
        color: '#B3B6B7',
        fontFamily: 'monospace',
        textAlign: 'left',
        whiteSpace: 'pre-line',
    },
    inputArea: {
        display: 'inline-flex',
        width: '100%'
    },
    promptLabel: {
        paddingTop: '3px',
        color: '#90EE90'
    },
    inputText: {
        fontSize: '13px',
        color: '#FFFFFF',
        fontFamily: 'monospace'
    },
    input: {
        border: '0',
        padding: '0 0 0 7px',
        margin: '0',
        flexGrow: '100',
        width: '100%',
        height: '22px',
        background: 'transparent',
        outline: 'none' // Fix for outline showing up on some browsers
    },
    a: {
        color: '#189a18'
    }
}
