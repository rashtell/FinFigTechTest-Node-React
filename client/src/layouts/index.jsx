import imagine1 from "assets/img/sidebar-1.jpg";
import { Component } from "react";
import NotificationSystem from "react-notification-system";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { clearAppError, clearAppSuccess } from "../redux/actions/index.actions";
import {
  changeFixedClasses,
  changeNotificationSystem,
  changeSidebarBackgroundColor,
  changeSidebarBackgroundImage,
  restoreRootDefaultState,
  toggleHasBackground
} from "../redux/actions/layout/layout.action";
import AllRoutes from "../routes.js";
import { style } from "../variables/Variables.jsx";

const mapStateToProps = (state, props) => {
  const { root } = state.layout;
  return {
    _notificationSystem: root._notificationSystem,
    image: root.image,
    color: root.color,
    hasImage: root.hasImage,
    fixedClasses: root.fixedClasses,

    authenticated: state.app.isAuthenticated,
    error: state.app.error,
    success: state.app.success,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChangeNotificationSystem(notificationSystem) {
    dispatch(changeNotificationSystem(notificationSystem));
  },
  onChangeSidebarBackgroundImage(image) {
    dispatch(changeSidebarBackgroundImage(image));
  },
  onChangeSidebarBackgroundColor(color) {
    dispatch(changeSidebarBackgroundColor(color));
  },
  onToggleHasBackground(hasBackground) {
    dispatch(toggleHasBackground(hasBackground));
  },
  onChangeFixedClasses(classes) {
    dispatch(changeFixedClasses(classes));
  },
  onRestoreRootDefaultState() {
    dispatch(restoreRootDefaultState());
  },

  invokeClearSuccess() {
    dispatch(clearAppSuccess());
  },
  invokeClearError() {
    dispatch(clearAppError());
  },
});

export class Admin extends Component {
  /**
   * @param position tr,tc,tl,br,bc,bl
   * @param message message,
   * @param level success, warning, error, info
   */
  handleNotificationClick = (
    position = "tr",
    message = "Notifying you to wash your hands and stay safe",
    level = "info"
  ) => {
    // var color = Math.floor(Math.random() * 4 + 1);
    // var level;
    // switch (color) {
    //   case 1:
    //     level = "success";
    //     break;
    //   case 2:
    //     level = "warning";
    //     break;
    //   case 3:
    //     level = "error";
    //     break;
    //   case 4:
    //     level = "info";
    //     break;
    //   default:
    //     break;
    // }

    this.props._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: <div>{message}.</div>,
      level: level,
      position: position,
      autoDismiss: 5,
    });
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                handleSuccess={this.handleSuccess}
                handleError={this.handleError}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = (routes, path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  handleImageClick = (image) => {
    this.props.onChangeSidebarBackgroundImage(image);
  };

  handleColorClick = (color) => {
    this.props.onChangeSidebarBackgroundColor(color);
  };

  handleHasImage = (hasImage) => {
    this.props.onToggleHasBackground(hasImage);
  };

  handleFixedClick = () => {
    if (this.props.fixedClasses === "dropdown") {
      this.props.onChangeFixedClasses("dropdown show-dropdown open");
    } else {
      this.props.onChangeFixedClasses("dropdown");
    }
  };

  handleSuccess = (success) => {
    const _notificationSystem = this.refs.notificationSystem;
    const level = "success";

    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="fa fa-success" />,
      message: <div>{success}</div>,
      level: level,
      position: "tr",
      autoDismiss: 5,
      onAdd: (notification) => {
        this.props.invokeClearSuccess();
      },
    });
  };

  handleError = (error) => {
    const _notificationSystem = this.refs.notificationSystem;
    const level = "error";

    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="fa fa-danger" />,
      message: <div>{error}</div>,
      level: level,
      position: "br",
      autoDismiss: 5,
      onAdd: (notification) => {
        this.props.invokeClearError();
      },
    });
  };

  componentDidMount() {
    this.props.onChangeNotificationSystem(this.refs.notificationSystem);

    this.props.onChangeSidebarBackgroundImage("assets/img/sidebar-3.jpg");
    this.props.onChangeSidebarBackgroundColor("orange");
  }

  componentDidUpdate(e) {
    const { success, error } = this.props;
    success && this.handleSuccess(success);
    error && this.handleError(error);

    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    const [unprotectedRoutes, protectedRoutes] = AllRoutes;
    const { authenticated, image, color, hasImage } = this.props;

    const routes = authenticated ? protectedRoutes : unprotectedRoutes;
    const redirect = authenticated ? "/events" : "/home";

    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />

        <Sidebar
          {...this.props}
          routes={routes}
          image={imagine1}
          color={color}
          hasImage={hasImage}
        />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="/" to={redirect} />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
