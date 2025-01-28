import { useCallback } from 'react';
import axios from 'axios';

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

function GetProjectByID(_id) {
    return useCallback(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${_id}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .catch(error => {
            throw new Error('Error fetching projects: ' + error.message);
        }), [_id]);
}

export default GetProjectByID;
