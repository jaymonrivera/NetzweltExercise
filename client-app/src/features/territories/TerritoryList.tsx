import { Table } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import TreeMenu from 'react-simple-tree-menu';

export default observer(function TerritoryList() {
    const { territoryStore } = useStore();
    const { treeNodeList } = territoryStore;
    
    return (
        <TreeMenu data={treeNodeList} />
    );
})

