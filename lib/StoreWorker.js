

export class StoreWorker{
    constructor( reducers ){
        this.store = Redux.createStore(reducers);
    }
    onmessage(e){
        store.dispatch(e.data)
        postMessage(store.getState());
    }
}

