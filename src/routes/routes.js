import WelcomeScreen from "../containers/WelcomeScreen";
import TabNavigator from "./TabNavigator";
import RegisterDescriptionScreen from "../containers/RegisterDescriptionScreen";
import RegisterUserInformationScreen from "../containers/RegisterUserInformationScreen";
import RegisterLocationsScreen from "../containers/RegisterLocationsScreen";
import RegisterConfirmationScreen from "../containers/RegisterConfirmationScreen";
import RegisterTagsScreen from "../containers/RegisterTagsScreen";
import RegisterPersonalitiesScreen from "../containers/RegisterPersonalitiesScreen";

const routes = {
  /*Register: {
    screen: RegisterStack,
    navigationOptions: {header: null}
  },*/
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {header: null}
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {header: null}
  },
  /*LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {header: null}
  },*/

  // Registration Process
  Locations: {screen: RegisterLocationsScreen, navigationOptions: {header: null}},
  UserInformation: {screen: RegisterUserInformationScreen, navigationOptions: {header: null}},
  Personalities: {screen: RegisterPersonalitiesScreen, navigationOptions: {header: null}},
  Tags: {screen: RegisterTagsScreen, navigationOptions: {header: null}},
  Description: {screen: RegisterDescriptionScreen, navigationOptions: {header: null}},
  Registered: {screen: RegisterConfirmationScreen, navigationOptions: {header: null}},
};

export default routes;