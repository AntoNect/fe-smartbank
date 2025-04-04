import axios from "axios";

const API_URL = import.meta.env.VITE_BE_SM_BASE_URL; // http://localhost:8080/api

/**
 * Funzione di login. Ricevuto in ingresso username e password, effettua la chiamata
 * POST al server all'endpoint: "/api/auth/login".
 * Ritorna il body della risposta del server.
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const apiLogin = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
    });
    return response.data;
};

/** Registrazione **/

export const apiSignup = async (email, username, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        username,
        password,
    });
    return response.data;
};

/** Profilo **/

/**
 * Ricevuto in ingresso il token JWT, effettua la chiamata GET al server
 * per recuperare le informazioni del profilo dell'utente loggato.
 * 
 * @param {*} token 
 * @returns 
 */
export const apiGetProfilo = async (token) => {
    const response = await axios.get(`${API_URL}/profilo`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const apiUpdateProfilo = async (
    telefono,
    indirizzo,
    idCittaResidenza,
    dataNascita,
    token
) => {
    const response = await axios.put(
        `${API_URL}/profilo/update`,
        {
            telefono,
            indirizzo,
            idCittaResidenza,
            dataNascita,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const apiCreateProfilo = async (
    nome,
    cognome,
    codiceFiscale,
    telefono,
    indirizzo,
    idCittaResidenza,
    dataNascita,
    token
) => {
    const response = await axios.post(
        `${API_URL}/profilo/insert`,
        {
            nome,
            cognome,
            codiceFiscale,
            telefono,
            indirizzo,
            idCittaResidenza,
            dataNascita,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

/** Operazioni **/

export const apiGetOperazione = async (idOperazione, token) => {
    const response = await axios.get(`${API_URL}/operazione/${idOperazione}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const apiGetOperazioni = async (filter, pageNumber, pageSize, token) => {
    const response = await axios.post(`${API_URL}/operazione/search`, filter, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: pageNumber,
            size: pageSize,
        },
    });
    return response;
};

export const apiInsertBonifico = async (
    nomeBeneficiario,
    ibanBeneficiario,
    importo,
    causale,
    istantaneo,
    dataAddebito,
    token
) => {
    const response = await axios.post(
        `${API_URL}/operazione/bonifico-in-uscita/insert`,
        {
            nomeBeneficiario,
            ibanBeneficiario,
            importo,
            causale,
            istantaneo,
            dataAddebito,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

/** Conto **/

export const apiGetDashBoard = async (token) => {
    const response = await axios.get(`${API_URL}/conto/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const apiGetCartaAttiva = async (token) => {
    const response = await axios.get(`${API_URL}/conto/carta-attiva`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

/** ATM **/
export const apiPostTerzePartiInsertPrelievo = async (
    numeroCarta,
    meseScadenzaCarta,
    annoScadenzaCarta,
    cvvCarta,
    importo,
    idAtm
) => {
    const response = await axios.post(
        `${API_URL}/operazione/terze-parti/prelievo/insert`,
        {
            numeroCarta,
            meseScadenzaCarta,
            annoScadenzaCarta,
            cvvCarta,
            importo,
            idAtm,
        }
    );
    return response;
};

export const apiPostTerzePartiInsertDeposito = async (
    numeroCarta,
    meseScadenzaCarta,
    annoScadenzaCarta,
    cvvCarta,
    importo,
    idAtm
) => {
    const response = await axios.post(
        `${API_URL}/operazione/terze-parti/deposito/insert`,
        {
            numeroCarta,
            meseScadenzaCarta,
            annoScadenzaCarta,
            cvvCarta,
            importo,
            idAtm,
        }
    );
    return response;
};
