import { observer } from 'mobx-react-lite';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default observer (function NavBar() {

    const { userStore: { user, logout} } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Netzwelt
                </Menu.Item>
                {/*<Menu.Item as={NavLink} to='/territories/all' name='Territories'>*/}
                {/*</Menu.Item>*/}

                {
 user !== null?(<Menu.Item position='right'>
     <Image src='/assets/user.png' avatar spaced='right'></Image>
     <Dropdown pointing='top left' text={user?.displayName} >
         <Dropdown.Menu>
             <Dropdown.Item onClick={logout} text='Logout' icon='power' />
         </Dropdown.Menu>

     </Dropdown>
 </Menu.Item>):<></>

                }
               
            </Container>
        </Menu>

    )
            
    
})