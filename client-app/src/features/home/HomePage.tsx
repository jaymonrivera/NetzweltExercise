import { Container } from "semantic-ui-react";
import { router } from "../../app/router/Routes";



export default function HomePage() {
    function navigateToLogIn() {
        router.navigate('territories/all');
    }
    navigateToLogIn();

    return (
        <Container style={{ margin:'7em'}}>
            <h1>Home Page</h1>
        </Container>
    )
}