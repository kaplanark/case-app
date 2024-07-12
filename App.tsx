import "./global.css";
import {NavigationContainer} from "@react-navigation/native";
import { NavigationStack } from "./components/navigation-stack";

export default function App() {
    return (
        <NavigationContainer>
            <NavigationStack/>
        </NavigationContainer>
    );
}


