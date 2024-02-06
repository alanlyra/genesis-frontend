import React, { useState } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DropzoneComponent } from 'react-dropzone-component';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Documents from './Documents'

const FileUpload = () => {

    const [dropzone, setDropzone] = useState(null);
    const { _id } = useParams();

    const djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "application/pdf",
        autoProcessQueue: false,
        uploadprogress: 100
    };

    const config = {
        iconFiletypes: ['.pdf'],
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };

    const eventHandlers = {
        init: dz => setDropzone(dz),
        addedFile: file => handleFileAdded(file)
    };

    const handlePost = () => {
        dropzone.files.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('_id', _id);

            axios.post('http://localhost:4100/pdf/upload', formData).then(() => {
                console.log('File uploaded successfully');
            }).catch((error) => {
                console.log('deu erro')
                // console.error('Error uploading file: ', error);
            });
        });
    }

    const handleFileAdded = (file) => {
        console.log(file);
    }


    return (

        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as='h5'>File Upload</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                            <Row className='text-center m-t-10'>
                                <Col>
                                    <Button onClick={handlePost}>Upload Files</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Documents />
        </React.Fragment>

    );
}

export default FileUpload;