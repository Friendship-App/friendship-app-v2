import {createStackNavigator} from "react-navigation";
import RegisterLocationsScreen from "../../containers/RegisterLocationsScreen";
import RegisterUserInformationScreen from "../../containers/RegisterUserInformationScreen";
import RegisterPersonalitiesScreen from "../../containers/RegisterPersonalitiesScreen";
import RegisterTagsScreen from "../../containers/RegisterTagsScreen";
import RegisterDescriptionScreen from "../../containers/RegisterDescriptionScreen";

const RegisterStack = createStackNavigator({
  Description: {screen: RegisterDescriptionScreen, navigationOptions: {header: null}},
  Locations: {screen: RegisterLocationsScreen, navigationOptions: {header: null}},
  UserInformation: {screen: RegisterUserInformationScreen, navigationOptions: {header: null}},
  Personalities: {screen: RegisterPersonalitiesScreen, navigationOptions: {header: null}},
  Tags: {screen: RegisterTagsScreen, navigationOptions: {header: null}},
});

export default RegisterStack;