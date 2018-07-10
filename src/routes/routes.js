import WelcomeScreen from "../containers/WelcomeScreen";
import RegisterScreen from "../containers/RegisterScreen";

const routes = {
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {header: null}
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {header: null}
  },
  /*LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {header: null}
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {header: null}
  }*/
};

export default routes;