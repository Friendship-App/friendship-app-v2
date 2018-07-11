import WelcomeScreen from "../containers/WelcomeScreen";
import RegisterStack from "./RegisterStack";

const routes = {
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {header: null}
  },
  Register: {
    screen: RegisterStack,
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