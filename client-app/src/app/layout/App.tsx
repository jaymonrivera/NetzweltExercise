import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";



function App() {
    const { territoryStore } = useStore();

    ;

    useEffect(() => {
        territoryStore.loadTerritoryList ();
    }, [territoryStore])




    if (territoryStore.loadingInitial) return <LoadingComponent content='Loading App' />

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
