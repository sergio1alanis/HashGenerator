async function sha256Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
}

async function sha512Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    return bufferToHex(hashBuffer);
}

async function sha1Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    return bufferToHex(hashBuffer);
}

// Nota: MD5 no se considera seguro para usos criptográficos
async function md5Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    return bufferToHex(hashBuffer);
}

function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function generateHash() {
    const inputElement = document.getElementById('inputText');
    const hashResult = document.getElementById('hashResult');
    const hashType = document.getElementById('hashType').value;

    if (!inputElement) {
        console.error('No se encontró el elemento de entrada');
        return;
    }

    const inputText = inputElement.value;

    if (inputText.trim() === '') {
        hashResult.textContent = 'Por favor, ingrese un texto para hashear.';
        return;
    }

    try {
        let hash;
        switch (hashType) {
            case 'sha256':
                hash = await sha256Hash(inputText);
                break;
            case 'sha512':
                hash = await sha512Hash(inputText);
                break;

            default:
                throw new Error('Tipo de hash no soportado');
        }
        hashResult.textContent = hash;
    } catch (error) {
        hashResult.textContent = 'Ocurrió un error al generar el hash.';
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    button.addEventListener('click', generateHash);
});