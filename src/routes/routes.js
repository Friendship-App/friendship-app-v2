import WelcomeScreen from "../containers/WelcomeScreen";
import RegisterStack from "./RegisterStack";
import TabNavigator from "./TabNavigator";

const routes = {
  Register: {
    screen: RegisterStack,
    navigationOptions: {header: null}
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {header: null}
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {header: null}
  }
  /*LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {header: null}
  },*/
};

export default routes;