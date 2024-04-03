import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import GetRoadmap from '../connections/RoadmapConnection';

function Roadmap({ data, setData }) {
  const history = useHistory();
  const location = useLocation();
  const _id = location.pathname.split('/').pop();
  const getRoadmap = GetRoadmap(_id);


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
          item.forecastDate !== null ? (
            <TimelineItem item={item} key={idx} />
          ) : null
        ))}
      </div>
    );

  const TimelineItem = ({ item, idx }) => {
    const [show, setShow] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });
    const updateItemRoadmap = useUpdateItemRoadmap();

    const isMounted = useRef(true);

    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formForecastDate">
                <Form.Label>Forecast Date</Form.Label>
                <Form.Control type="text" name="forecastDate" value={editedItem.forecastDate} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formForecast">
                <Form.Label>Forecast</Form.Label>
                <Form.Control type="text" name="forecast" value={editedItem.forecast} onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <React.Fragment>

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
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit-item-roadmap/${_id}`, updatedItem)
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