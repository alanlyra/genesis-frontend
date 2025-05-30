import { useCallback } from 'react';
import {axios} from '../../../connection/axios-config';

function GetProjects() {
    return useCallback(() => axios.get(process.env.REACT_APP_BACKEND_URL + '/projects')
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .catch(error => {
            throw new Error('Error fetching projects: ' + error.message);
        }), []);
}

export default GetProjects;
