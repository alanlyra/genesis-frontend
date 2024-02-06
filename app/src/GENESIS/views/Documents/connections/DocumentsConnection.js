import { useCallback } from 'react';
import axios from 'axios';

function GetDocuments(_id) {
    return useCallback(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-documents/${_id}`)
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

export default GetDocuments;
