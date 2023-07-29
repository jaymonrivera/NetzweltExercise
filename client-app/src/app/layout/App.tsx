import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import { router } from "../router/Routes";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";



function App() {
    const { territoryStore } = useStore();
    const {commonStore, userStore } = useStore();
    

    useEffect(() => {

        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded();
            router.navigate('/account/login');
        }

        territoryStore.loadTerritoryList ();
    }, [territoryStore, commonStore])




    if (!commonStore.appLoaded) return <LoadingComponent content='Loading App' />

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Outlet/>
            </Container>

        </>
    )
};

export default observer(App);
