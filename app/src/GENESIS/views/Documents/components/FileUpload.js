import React, { useState } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DropzoneComponent } from 'react-dropzone-component';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FileUpload = ({ data, setData }) => {

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
        const fileManifestName = 'manifest-' + Date.now() + '.mf';
        (async () => {
            const uploadPromises = dropzone.files.map(async file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('_id', _id);

                try {
                    const response = await axios.post(`http://localhost:4100/pdf/upload?fileManifestName=${fileManifestName}`, formData);
                    setData(response.data)
                } catch (error) {
                    console.log(error);
                }
            });

            // Aguarde todas as promessas serem resolvidas
            await Promise.all(uploadPromises);

            // Depois que todos os arquivos foram enviados, chame callQueue
            await callQueue(fileManifestName);
        })();
    }

    async function callQueue(fileManifestName) {
        try {
            const response = await axios.get(`http://localhost:4106/queue?fileManifestName=${fileManifestName}`);
            //setData(response.data)
        } catch (error) {
            console.log(error);
        }
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

        </React.Fragment>

    );
}

export default FileUpload;