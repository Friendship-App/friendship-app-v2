import {createStackNavigator} from "react-navigation";
import RegisterLocationsScreen from "../../containers/RegisterLocationsScreen";
import RegisterUserInformationScreen from "../../containers/RegisterUserInformationScreen";
import RegisterPersonalitiesScreen from "../../containers/RegisterPersonalitiesScreen";

const RegisterStack = createStackNavigator({
  Locations: {screen: RegisterLocationsScreen, navigationOptions: {header: null}},
  UserInformation: {screen: RegisterUserInformationScreen, navigationOptions: {header: null}},
  Personalities: {screen: RegisterPersonalitiesScreen, navigationOptions: {header: null}},
  // Tags: {screen: RegisterTagsScreen},
  // Description: {screen: RegisterDescriptionScreen}
});

export default RegisterStack;