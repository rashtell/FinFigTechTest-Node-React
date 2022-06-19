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
  getEventCategories,
  searchEvent,
} from "../redux/actions/fetch/user/event.user.action";
import { setUserSearchEventRequestParams } from "../redux/actions/index.actions";

const mapStateToProps = (state, props) => {
  return {
    searchEventRequest: state.fetch.user.event.searchEvent.request,
    searchEventIsLoading: state.fetch.user.event.searchEvent.loading,
    searchEventResponseMessage:
      state.fetch.user.event.searchEvent.response.message,
    searchEventResponse: state.fetch.user.event.searchEvent.response.data,

    getEventCategoriesIsLoading:
      state.fetch.user.event.getEventCategories.loading,
    getEventCategoriesResponse:
      state.fetch.user.event.getEventCategories.response.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  invokeSetSearchEventParams({ categories, ...payload }) {
    if (Array.isArray(categories) && !categories.length) {
      categories = null;
    }
    dispatch(setUserSearchEventRequestParams({ categories, ...payload }));
  },
  invokeSearchEvent({ title, categories, from, to, isVirtual, address }) {
    dispatch(
      searchEvent({
        title,
        categories,
        dateRange: { from, to },
        isVirtual,
        address,
      })
    );
  },
  invokeGetEventCategories() {
    dispatch(getEventCategories());
  },
});

class Home extends React.Component {
  componentDidMount() {
    //get all events and event categories
    this.props.invokeGetEventCategories();
    this.props.invokeSearchEvent({
      title: "",
      categories: null,
      from: null,
      to: null,
      isVirtual: null,
      address: "",
    });
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
   * This method renders the search panel
   * @returns JSX
   */
  renderSearchArea = () => {
    const {
      searchEventRequest,
      searchEventIsLoading,
      searchEventResponseMessage,
      getEventCategoriesResponse,

      invokeSetSearchEventParams,
      invokeSearchEvent,
      invokeGetEventCategories,
    } = this.props;

    const dateRange = searchEventRequest.dateRange;
    const dateFromValue = dateRange.from
      ? this.getInputDateFormat(dateRange.from)
      : "";
    const dateToValue = dateRange.to
      ? this.getInputDateFormat(dateRange.to)
      : "";

    return (
      <Card>
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Search Menu</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Row>
                    <Col>
                      <FloatingLabel
                        controlId="searchTitle"
                        label="Title"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            invokeSetSearchEventParams({ title: value });
                          }}
                          value={searchEventRequest.title}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="searchAddress"
                        label="Address"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            invokeSetSearchEventParams({ address: value });
                          }}
                          value={searchEventRequest.address}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="Date-range"
                        label="From date"
                        className="mb-2"
                      >
                        <Form.Control
                          type="date"
                          onChange={(e) => {
                            let value = e.currentTarget.value;
                            value = value ? new Date(value).valueOf() : value;

                            invokeSetSearchEventParams({
                              dateRange: {
                                ...searchEventRequest.dateRange,
                                from: value,
                              },
                            });
                          }}
                          value={dateFromValue}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col>
                      <FloatingLabel
                        controlId="Date-range"
                        label="To date"
                        className="mb-2"
                      >
                        <Form.Control
                          type="date"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            invokeSetSearchEventParams({
                              dateRange: {
                                ...searchEventRequest.dateRange,
                                to: value,
                              },
                            });
                          }}
                          value={dateToValue}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        id={"is-virtual-switch"}
                        label={"Virtual event"}
                        onChange={(e) => {
                          invokeSetSearchEventParams({
                            isVirtual: !searchEventRequest.isVirtual,
                          });
                        }}
                        checked={searchEventRequest.isVirtual ?? false}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <div>
                        <h5>Interests</h5>
                        {getEventCategoriesResponse.map((eventCategory, i) => (
                          <Form.Check
                            key={i}
                            type="switch"
                            id={"event-category-switch-" + i}
                            label={eventCategory.name}
                            inline
                            // checked={searchEventRequest.categories[i]}
                            onChange={(e) => {
                              const checked = e.currentTarget.checked;
                              const categories =
                                searchEventRequest.categories ?? [];
                              if (checked) {
                                invokeSetSearchEventParams({
                                  categories: [
                                    ...categories,
                                    eventCategory.name,
                                  ],
                                });
                              } else {
                                invokeSetSearchEventParams({
                                  categories: categories.filter(
                                    (filterValue) =>
                                      filterValue !== eventCategory.name
                                  ),
                                });
                              }
                            }}
                          />
                        ))}
                      </div>
                    </Col>
                  </Row>

                  <Button
                    className="mt-3 "
                    variant="primary"
                    type="button"
                    disabled={searchEventIsLoading}
                    onClick={() => {
                      invokeSearchEvent(searchEventRequest);
                    }}
                  >
                    {searchEventIsLoading ? (
                      <span>
                        <span className="text-primary me-2">Searching</span>
                        <Spinner animation="grow" variant="primary" size="sm" />
                      </span>
                    ) : (
                      <span>Search for events</span>
                    )}
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    );
  };

  /**
   * This method renders all events
   * @returns JSX
   */
  renderEvents() {
    const { searchEventResponse, searchEventIsLoading } = this.props;

    const eventViews = searchEventResponse.map((event, i) => (
      <Row key={i}>
        <Col>
          <Card className="text-left">
            <Card.Header>{event.category}</Card.Header>
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
        <h3 className="font-monospace">Events</h3>
        <div>{searchEventIsLoading ? <EventPlaceholder /> : eventViews}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="content">
        <Container className="mb-2">
          <Header />
          {this.renderSearchArea()}
        </Container>
        <Container fluid>{this.renderEvents()}</Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
