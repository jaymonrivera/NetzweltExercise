import { makeAutoObservable } from "mobx";
import { TreeNodeInArray } from "react-simple-tree-menu";
import agent from "../api/agent";
import SiteConstant from "../helper/site-constant";
import { Territory } from "../models/Territory";
import { store } from "./store";


export default class TerritoryStore {
    treeNodeList: []|any = undefined;
    territoryList: Territory[] = [];
    loading = false;
    loadingInitial = false;
    territoryListRegistry = new Map<string, Territory>();
 

    constructor() {
        makeAutoObservable(this)
    }

    loadTerritoryList = async() => {
        this.setLoadingInitial(true);

        try {

            var json =

            
              `
               [
                {
                  "id": "1",
                  "name": "Metro Manila",
                  "parent": null
                },
                {
                  "id": "101",
                  "name": "Manila",
                  "parent": "1"
                },
                {
                  "id": "10101",
                  "name": "Malate",
                  "parent": "101"
                },
                {
                  "id": "10102",
                  "name": "Ermita",
                  "parent": "101"
                },
                {
                  "id": "10103",
                  "name": "Binondo",
                  "parent": "101"
                },
                {
                  "id": "102",
                  "name": "Makati",
                  "parent": "1"
                },
                {
                  "id": "10201",
                  "name": "Poblacion",
                  "parent": "102"
                },
                {
                  "id": "10202",
                  "name": "Bel-Air",
                  "parent": "102"
                },
                {
                  "id": "10203",
                  "name": "San Lorenzo",
                  "parent": "102"
                },
                {
                  "id": "10204",
                  "name": "Urdaneta",
                  "parent": "102"
                },
                {
                  "id": "103",
                  "name": "Marikina",
                  "parent": "1"
                },
                {
                  "id": "10301",
                  "name": "Sto Nino",
                  "parent": "103"
                },
                {
                  "id": "10302",
                  "name": "Malanday",
                  "parent": "103"
                },
                {
                  "id": "10303",
                  "name": "Concepcion I",
                  "parent": "103"
                },
                {
                  "id": "2",
                  "name": "CALABARZON",
                  "parent": null
                },
                {
                  "id": "201",
                  "name": "Laguna",
                  "parent": "2"
                },
                {
                  "id": "20101",
                  "name": "Calamba",
                  "parent": "201"
                },
                {
                  "id": "20102",
                  "name": "Sta. Rosa",
                  "parent": "201"
                },
                {
                  "id": "202",
                  "name": "Cavite",
                  "parent": "2"
                },
                {
                  "id": "20201",
                  "name": "Kawit",
                  "parent": "202"
                },
                {
                  "id": "203",
                  "name": "Batangas",
                  "parent": "2"
                },
                {
                  "id": "20301",
                  "name": "Lipa",
                  "parent": "203"
                },
                {
                  "id": "20302",
                  "name": "Tanauan",
                  "parent": "203"
                },
                {
                  "id": "3",
                  "name": "Central Luzon",
                  "parent": null
                },
                {
                  "id": "301",
                  "name": "Bulacan",
                  "parent": "3"
                },
                {
                  "id": "302",
                  "name": "Nueva Ecija",
                  "parent": "3"
                },
                {
                  "id": "303",
                  "name": "Tarlac",
                  "parent": "3"
                },
                {
                  "id": "304",
                  "name": "Pampanga",
                  "parent": "3"
                }
              ]
            `;

            let territoryList: Territory[] = [];

            if (!SiteConstant.UseDummyConnection) {
                //API DATA
                territoryList = await agent.Territories.list();
            }
            else {
                //DUMMY DATA
                territoryList = JSON.parse(json) as Territory[];
            }
           

            

  
            const treeNodeList = this.getChildIds(territoryList, null);

            this.treeNodeList = treeNodeList;

            this.setLoadingInitial(false);
            

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }
    //NODES
    getChildIds = (arr: Territory[], parentId?: number|null) => {
        var self = this;
        return arr.reduce(function (ret: TreeNodeInArray[], item: Territory) {
            if (item.parent === parentId) {
                ret = ret.concat({
                    key: item.id.toString(),
                    label: item.name,
                    index: item.id,
                    parent: item.parent,
                    nodes: self.getChildIds(arr, item.id)
                });
            }
            return  ret;
            
        }, []);
    }

    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


}