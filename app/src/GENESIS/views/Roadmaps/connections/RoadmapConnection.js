import { useCallback } from 'react';
import axios from 'axios';

function GetRoadmap(_id, mode) {
    let endpoint = '/roadmap/';
    if (mode == 'document') {
       endpoint = '/roadmap/document/';
    }
    return useCallback(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}${_id}`)
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

export default GetRoadmap;
