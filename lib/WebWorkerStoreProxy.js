export function createStoreFactory(url){
    if(window.Worker){
        //return proxy
        return new WebWorkerStoreProxy(url);
    }else{
        //import store directly from file
    }
}

export class WebWorkerStoreProxy {

    constructor( url ){
        
            //create web Worker
            this.myStateWorker = new Worker(url);
            this.myStateWorker.onmessage = this.process;
            this.subscriptions = new WeakSet();

    }

    dispatch( action ){
        this.myStateWorker.postMessage(action);
    }
    getState(){
        return this.state;
    }
    subscribe( listener ){
        this.subscriptions.add({listener});
    }
    process(e){
        this.state = e.data;
        for(let o of this.subscriptions){
            o.listener();
        }

    }
}