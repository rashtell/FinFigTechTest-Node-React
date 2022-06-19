import React from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import EventPlaceholder from "../components/Placeholder/EventPlaceholder";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../redux/actions/fetch/admin/event.admin.action";
import {
  clearAdminCreateEventResponseMessage,
  clearAdminDeleteEventResponseMessage,
  clearAdminUpdateEventResponseMessage,
  setAdminCreateEventRequestParams,
  setAdminUpdateEventRequestParams,
} from "../redux/actions/index.actions";

const mapStateToProps = (state, props) => {
  return {
    getEventsIsLoading: state.fetch.admin.event.getEvents.loading,
    getEventsResponseMessage:
      state.fetch.admin.event.getEvents.response.message,
    getEventsResponse: state.fetch.admin.event.getEvents.response.data,

    createEventRequest: state.fetch.admin.event.createEvent.request,
    createEventIsLoading: state.fetch.admin.event.createEvent.loading,
    createEventResponseMessage:
      state.fetch.admin.event.createEvent.response.message,
    createEventResponse: state.fetch.admin.event.createEvent.response.data,

    updateEventRequest: state.fetch.admin.event.updateEvent.request,
    updateEventIsLoading: state.fetch.admin.event.updateEvent.loading,
    updateEventResponseMessage:
      state.fetch.admin.event.updateEvent.response.message,
    updateEventResponse: state.fetch.admin.event.updateEvent.response.data,

    deleteEventIsLoading: state.fetch.admin.event.deleteEvent.loading,
    deleteEventResponseMessage:
      state.fetch.admin.event.deleteEvent.response.message,
    deleteEventResponse: state.fetch.admin.event.deleteEvent.response.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  invokeAdminGetEvent() {
    dispatch(getEvents());
  },

  invokeSetAdminCreateEventParams(payload) {
    dispatch(setAdminCreateEventRequestParams(payload));
  },
  invokeAdminCreateEvent(payload) {
    dispatch(createEvent(payload));
  },
  invokeClearAdminCreateEventResponseMessage() {
    dispatch(clearAdminCreateEventResponseMessage());
  },

  invokeSetAdminUpdateEventParams(payload) {
    dispatch(setAdminUpdateEventRequestParams(payload));
  },
  invokeAdminUpdateEvent(payload) {
    dispatch(updateEvent(payload._id, payload));
  },
  invokeClearAdminUpdateEventResponseMessage() {
    dispatch(clearAdminUpdateEventResponseMessage());
  },

  invokeAdminDeleteEvent(id) {
    dispatch(deleteEvent(id));
  },
  invokeClearAdminDeleteEventResponseMessage() {
    dispatch(clearAdminDeleteEventResponseMessage());
  },
});

class Events extends React.Component {
  state = {
    isCreate: true,
  };

  componentDidMount() {
    //get all admin's events
    this.props.invokeAdminGetEvent();
  }

  chnageToCreateMode() {
    this.setState({ isCreate: true });
  }

  chnageToUpdateMode() {
    this.setState({ isCreate: false });
  }

  updateEvent(event) {
    this.chnageToUpdateMode();
    //set the select event (for update) details to the request parasms state
    this.props.invokeSetAdminUpdateEventParams(event);

    //scroll to the edit form
    window.scrollTo(0, 0);
  }

  deleteEvent(id) {
    const { invokeAdminDeleteEvent } = this.props;

    //double check if you really want to delete this event
    if (!window.confirm("Are you sure you want to delete this event ? ")) {
      return null;
    }

    //delete event
    invokeAdminDeleteEvent(id);
  }

  /**
   * This methods converts any date format to the input date accepted format
   * @param {string} dateString
   * @returns string
   */
  getInputDateFormat(dateString) {
    const month = new Date(dateString).getUTCMonth();
    const fullMonth = month < 10 ? "0" + month : month;

    return (
      new Date(dateString).getFullYear() +
      "-" +
      fullMonth +
      "-" +
      new Date(dateString).getDate()
    );
  }

  /**
   * This function handles the creation and updating of events
   * @returns JSX
   */
  renderCreateEvent = () => {
    const {
      createEventRequest,
      createEventIsLoading,
      createEventResponseMessage,
      createEventResponse,

      updateEventRequest,
      updateEventIsLoading,
      updateEventResponseMessage,
      updateEventResponse,

      deleteEventResponseMessage,
      deleteEventResponse,

      invokeSetAdminCreateEventParams,
      invokeAdminCreateEvent,

      invokeSetAdminUpdateEventParams,
      invokeAdminUpdateEvent,

      invokeClearAdminCreateEventResponseMessage,
      invokeClearAdminUpdateEventResponseMessage,
      invokeClearAdminDeleteEventResponseMessage,
    } = this.props;
    const { isCreate } = this.state;

    //select params and methods based on the current mode (create or update)
    const request = isCreate ? createEventRequest : updateEventRequest;
    const loading = isCreate ? createEventIsLoading : updateEventIsLoading;
    const responseMessage = isCreate
      ? createEventResponseMessage
      : updateEventResponseMessage;
    const response = isCreate ? createEventResponse : updateEventResponse;

    const setRequestParams = isCreate
      ? invokeSetAdminCreateEventParams
      : invokeSetAdminUpdateEventParams;
    const invokeEventAction = isCreate
      ? invokeAdminCreateEvent
      : invokeAdminUpdateEvent;
    const invokeClearEventAction = isCreate
      ? invokeClearAdminCreateEventResponseMessage
      : invokeClearAdminUpdateEventResponseMessage;

    //convert the unix date format from state to input acceptable format
    const eventDate = this.getInputDateFormat(request.date);

    const header = isCreate ? "Create event" : "Update event";

    //diplay response error message
    if (responseMessage && !response.title) {
      //clear error response message
      invokeClearEventAction();
      //display error response message
      this.props.handleError(responseMessage);
    }
    //diplay response success message
    else if (responseMessage && response.title) {
      //clear success response message
      invokeClearEventAction();
      //display success response message
      this.props.handleSuccess(responseMessage);
      this.chnageToCreateMode();
    }

    //diplay response error message
    if (deleteEventResponseMessage && !deleteEventResponse.title) {
      invokeClearAdminDeleteEventResponseMessage();
      this.props.handleError(deleteEventResponseMessage);
    }
    //diplay response success message
    else if (deleteEventResponseMessage && deleteEventResponse.title) {
      invokeClearAdminDeleteEventResponseMessage();
      this.props.handleSuccess(deleteEventResponseMessage);
    }

    return (
      <Card>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{header}</Accordion.Header>

              <Accordion.Body>
                <Form>
                  <Row>
                    <Col>
                      <FloatingLabel
                        controlId="eventTitle"
                        label="Title"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setRequestParams({ title: value });
                          }}
                          value={request.title}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="eventDescription"
                        label="Description"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setRequestParams({ description: value });
                          }}
                          value={request.description}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="eventCategory"
                        label="Category"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setRequestParams({ category: value });
                          }}
                          value={request.category}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FloatingLabel
                        controlId="eventAddress"
                        label="Address"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            setRequestParams({ address: value });
                          }}
                          value={request.address}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="eventDate"
                        label="Date"
                        className="mb-2"
                      >
                        <Form.Control
                          type="date"
                          onChange={(e) => {
                            let value = e.currentTarget.value;
                            value = value ? new Date(value).valueOf() : value;
                            setRequestParams({ date: value });
                          }}
                          value={eventDate}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <Form.Check
                        type="switch"
                        id={"is-virtual-switch"}
                        label={"Virtual event"}
                        onChange={(e) => {
                          setRequestParams({
                            isVirtual: !request.isVirtual,
                          });
                        }}
                        checked={request.isVirtual ?? false}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      className="mt-3 "
                      variant="primary"
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        invokeEventAction(request);
                      }}
                    >
                      {loading ? (
                        <span>
                          <span className="text-primary me-2">
                            {isCreate ? "Creating" : "Updating"}
                          </span>
                          <Spinner
                            animation="grow"
                            variant="primary"
                            size="sm"
                          />
                        </span>
                      ) : (
                        <span>{isCreate ? "Create" : "Update"}</span>
                      )}
                    </Button>

                    <Button
                      className="mt-3 ms-3"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        //reset request params
                        setRequestParams({
                          title: "",
                          description: "",
                          category: "",
                          date: "",
                          isVirtual: false,
                          address: "",
                        });

                        //change to create mode
                        this.chnageToCreateMode();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    );
  };

  /**
   * This method renders all the admin's events
   * @returns JSX
   */
  renderEvents() {
    const { getEventsResponse, getEventsIsLoading } = this.props;

    const eventViews = getEventsResponse.map((event, i) => (
      <Row key={i}>
        <Col>
          <Card className="">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span> {event.category}</span>

                <span>
                  <span className="me-3">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => this.updateEvent(event)}
                    >
                      <i className="fa fa-edit text-info"></i>
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => this.deleteEvent(event._id)}
                    >
                      <i className="fa fa-trash text-danger"></i>
                    </button>
                  </span>
                </span>
              </div>
            </Card.Header>

            <Card.Body>
              <Card.Title className="h3">
                {event.title.toLocaleUpperCase()}
              </Card.Title>

              <Card.Text>{event.description.toLocaleLowerCase()}</Card.Text>

              <Card.Text className="text-muted">
                {event.isVirtual
                  ? "This is a virtual event"
                  : "This is a physical event"}
              </Card.Text>

              <Card.Text className="test-info">
                Address: {event.address}
              </Card.Text>
            </Card.Body>

            <Card.Footer className="text-muted">
              {new Date(event.date).toDateString()}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    ));

    return (
      <div>
        <h3 className="font-monospace">Your events</h3>
        <div>{getEventsIsLoading ? <EventPlaceholder /> : eventViews}</div>
      </div>
    );
  }

  render() {
    const {} = this.props;

    return (
      <div className="content">
        <Container className="mb-2">
          <Header />
          {this.renderCreateEvent()}
        </Container>
        <Container fluid>{this.renderEvents()}</Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
