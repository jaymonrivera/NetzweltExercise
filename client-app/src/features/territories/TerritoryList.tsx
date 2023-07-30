import { observer } from 'mobx-react-lite';
import TreeMenu from 'react-simple-tree-menu';
import { useStore } from '../../app/stores/store';

export default observer(function TerritoryList() {
    const { territoryStore } = useStore();
    const { treeNodeList } = territoryStore;
    
    return (
        <>
            <h1>Territories</h1>
            <p>Here are the list of territories</p>
            <TreeMenu data={treeNodeList} />
        </>
     
    );
})

