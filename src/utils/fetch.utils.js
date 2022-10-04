const axios = require('axios');
const { OK_STATUS, BAD_REQUEST_STATUS, NOT_FOUND_STATUS } = require('../constants/httpConstants');
const { isEmpty } = require('./validator');
const BusinessError = require('../models/BusinessError');

async function fetchData(URL, query = {}) {

    if (!isEmpty(query)) {
        const queryParams = new URLSearchParams(query).toString();
        URL = URL.concat('?' + queryParams);
    }

    try {
        const filmsResponse = await axios.get(URL);
        return {
            ...OK_STATUS,
            ...getResults(filmsResponse)
        };

    } catch (e) {
        if (e.response.status === NOT_FOUND_STATUS.code) {
            throw new BusinessError({
                code: '',
                httpCode: NOT_FOUND_STATUS.code,
                messages: NOT_FOUND_STATUS.description
            });
        } else {
            throw new BusinessError({
                code: '',
                httpCode: BAD_REQUEST_STATUS.code,
                messages: BAD_REQUEST_STATUS.description
            });
        }
    }

}

function getResults(response) {
    const { results, count, next, previous } = response.data;
    return {
        results: results ?? response.data,
        count,
        next,
        previous
    };
}

function nullOrStringValue(value) {
    return value || `'${value}'`
}


module.exports = {
    fetchData,
    nullOrStringValue
};