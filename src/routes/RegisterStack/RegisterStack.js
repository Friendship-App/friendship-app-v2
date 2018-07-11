import {createStackNavigator} from "react-navigation";
import RegisterLocationsScreen from "../../containers/RegisterLocationsScreen";
import RegisterUserInformationScreen from "../../containers/RegisterUserInformationScreen";
import RegisterPersonalitiesScreen from "../../containers/PersonalitiesScreen";
import RegisterDescriptionScreen from "../../containers/RegisterDescriptionScreen";
import RegisterTagsScreen from "../../containers/RegisterTagsScreen";

const RegisterStack = createStackNavigator({
  Locations: {screen: RegisterLocationsScreen, navigationOptions: {header: null}},
  UserInformation: {screen: RegisterUserInformationScreen, navigationOptions: {header: null}},
  Personalities: {screen: RegisterPersonalitiesScreen},
  Tags: {screen: RegisterTagsScreen},
  Description: {screen: RegisterDescriptionScreen}
});

export default RegisterStack;