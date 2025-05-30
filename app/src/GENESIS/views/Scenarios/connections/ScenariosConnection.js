import { useCallback } from 'react';
import axios from 'axios';

function GetScenarios(_id, mode) {
    let endpoint = '/scenarios/';
    if (mode == 'document') {
       endpoint = '/scenarios/document/';
    }
    return useCallback(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}${_id}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .catch(error => {
            return [];
            throw new Error('Error fetching projects: ' + error.message);
        }), [_id]);
}

export default GetScenarios;
