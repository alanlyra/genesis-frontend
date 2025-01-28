import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import GetRoadmap from '../connections/RoadmapConnection';

function Roadmap({ data, setData }) {
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '2024-01-01',
    endDate: '2100-12-31',
    status: 'Created',
    owner: '1',
    createdBy: '1',
    createdDate: new Date(),
    keywords: [] // Adicione o campo keywords aqui
  });

  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  let getRoadmap = null;
  if(location.pathname.includes('/document')) getRoadmap = GetRoadmap(_id, 'document');
  else getRoadmap = GetRoadmap(_id, 'project');

  const loadRoadmap = async () => {
    const roadmap = await getRoadmap();
    setData(roadmap);
  }

  useEffect(() => {
    loadRoadmap()
  }, []);

  const Timeline = () =>
    data.length > 0 && (
      <div className="timeline-container">
        {data.map((item, idx) => (
          item.forecastDate !== null && !item.deleted ? (
            <TimelineItem item={item} key={idx} />
          ) : null
        ))}
      </div>
    );

  const TimelineItem = ({ item, idx }) => {
    const [show, setShow] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const updateItemRoadmap = useUpdateItemRoadmap();
    const softDeleteItemRoadmap = useSoftDeleteItemRoadmap();
    const deleteItemRoadmap = useDeleteItemRoadmap();

    const isMounted = useRef(true);

    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const handleDeleteConfirm = () => {
      setShowDeleteConfirm(true);
    };

    const handleDeleteCancel = () => {
      setShowDeleteConfirm(false);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
      updateItemRoadmap(item._id, editedItem)
        .then(updatedItem => {
          //console.log(updatedItem);
          const updatedData = data.map(dataItem => dataItem._id === item._id ? updatedItem : dataItem);
          setData(updatedData);
          if (isMounted.current) {
            setShow(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };


    const handleDelete = () => {
      deleteItemRoadmap(item._id)
        .then(updatedItem => {
          //console.log(updatedItem);
          const updatedData = data.map(dataItem => dataItem._id === item._id ? updatedItem : dataItem);
          setData(updatedData);
          if (isMounted.current) {
            setShowDeleteConfirm(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleSoftDelete = () => {
      editedItem.deleted = true;
      editedItem.deletedDate = new Date();
      softDeleteItemRoadmap(item._id, editedItem)
        .then(updatedItem => {
          //console.log(updatedItem);
          const updatedData = data.map(dataItem => dataItem._id === item._id ? updatedItem : dataItem);
          setData(updatedData);
          if (isMounted.current) {
            setShowDeleteConfirm(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleChange = (event) => {
      setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
    };

    return (
      <div key={idx} className="timeline-item">
        <div className="timeline-item-content">
          <span className="tag" style={{ background: '#018f69' }}>
            article
          </span>
          <time>{item.forecastDate}</time>
          <p>{item.forecast}</p>
          {item.forecastDate && (
            <Button variant="primary" onClick={handleShow}>
              Details...
            </Button>
          )}
          <span className="circle" />
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formForecastDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" name="forecastDate" value={editedItem.forecastDate} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formForecast">
                <Form.Label>Event</Form.Label>
                <Form.Control as="textarea" name="forecast" value={editedItem.forecast} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formSentence">
                <Form.Label>Original Sentence</Form.Label>
                <Form.Control as="textarea" name="sentence" value={editedItem.sentence} onChange={handleChange} readOnly/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>

            <Modal show={showDeleteConfirm} onHide={handleDeleteCancel} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteCancel}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleSoftDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const handleRefine = (event) => {
    event.preventDefault();
    
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/refine/${_id}`, project._id)
      .then(response => {
        console.log(response.data);
        //getProjects().then(setData).catch(console.error);
        //setShowEditModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleDownload = (event) => {
    event.preventDefault();

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roadmap-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  return (
    <React.Fragment>

      <div>
        <Button variant="secondary" onClick={handleRefine} style={{ marginBottom: '20px' }}>
          Refine
        </Button>
        <Button variant="secondary" onClick={handleDownload} style={{ marginBottom: '20px', float: 'right' }}>
          Download
        </Button>
      </div>

      <Timeline />

      <style>
        {`
          
          .timeline-container {
            display: flex;
            flex-direction: column;
            position: relative;
            margin: 40px 0;
        }
        
        .timeline-container::after {
            background-color: #e17b77;
            content: '';
            position: absolute;
            left: calc(50% - 2px);
            width: 4px;
            height: 100%;
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: 30px;
            position: relative;
            margin: 10px 0;
            width: 50%;
        }
        
        .timeline-item:nth-child(odd) {
            align-self: flex-end;
            justify-content: flex-start;
            padding-left: 30px;
            padding-right: 0;
        }

        .timeline-item-content {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 15px;
          position: relative;
          width: 400px;
          max-width: 70%;
          text-align: right;
      }
      
      .timeline-item-content::after {
          content: ' ';
          background-color: #fff;
          box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.2);
          position: absolute;
          right: -7.5px;
          top: calc(50% - 7.5px);
          transform: rotate(45deg);
          width: 15px;
          height: 15px;
      }
      
      .timeline-item:nth-child(odd) .timeline-item-content {
          text-align: left;
          align-items: flex-start;
      }
      
      .timeline-item:nth-child(odd) .timeline-item-content::after {
          right: auto;
          left: -7.5px;
          box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
      }

      .timeline-item-content .tag {
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        top: 5px;
        left: 5px;
        letter-spacing: 1px;
        padding: 5px;
        position: absolute;
        text-transform: uppercase;
    }
    
    .timeline-item:nth-child(odd) .timeline-item-content .tag {
        left: auto;
        right: 5px;
    }
    
    .timeline-item-content time {
        color: #777;
        font-size: 12px;
        font-weight: bold;
    }
    
    .timeline-item-content p {
        font-size: 16px;
        line-height: 24px;
        margin: 15px 0;
        max-width: 250px;
    }
    
    .timeline-item-content a {
        font-size: 14px;
        font-weight: bold;
    }
    
    .timeline-item-content a::after {
        content: ' ►';
        font-size: 12px;
    }
    
    .timeline-item-content .circle {
        background-color: #fff;
        border: 3px solid #e17b77;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 10px);
        right: -40px;
        width: 20px;
        height: 20px;
        z-index: 100;
    }
    
    .timeline-item:nth-child(odd) .timeline-item-content .circle {
        right: auto;
        left: -40px;
    }

    @media only screen and (max-width: 1023px) {
      .timeline-item-content {
          max-width: 100%;
      }
  }
  
  @media only screen and (max-width: 767px) {
      .timeline-item-content,
      .timeline-item:nth-child(odd) .timeline-item-content {
          padding: 15px 10px;
          text-align: center;
          align-items: center;
      }
  
      .timeline-item-content .tag {
          width: calc(100% - 10px);
          text-align: center;
      }
  
      .timeline-item-content time {
          margin-top: 20px;
      }
  
      .timeline-item-content a {
          text-decoration: underline;
      }
  
      .timeline-item-content a::after {
          display: none;
      }
  }
        `}
      </style>

    </React.Fragment>
  )
}

function useUpdateItemRoadmap() {
  return useCallback((_id, updatedItem) => {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/events-roadmap/${_id}`, updatedItem)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .catch(error => {
        throw new Error('Error fetching roadmap item: ' + error.message);
      });
  }, []);
}

function useDeleteItemRoadmap() {
  return useCallback((_id) => {
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/events-roadmap/${_id}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .catch(error => {
        throw new Error('Error fetching roadmap item: ' + error.message);
      });
  }, []);
}

function useSoftDeleteItemRoadmap() {
  return useCallback((_id, updatedItem) => {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/events-roadmap/${_id}`, updatedItem)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .catch(error => {
        throw new Error('Error fetching roadmap item: ' + error.message);
      });
  }, []);
}

export default Roadmap;