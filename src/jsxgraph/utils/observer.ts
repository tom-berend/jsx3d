// absolutely minimal observer to detangle JSXGraph

// Observers (subscribers) are functions.  All methods are static so no need to instantiate class.

export class Observer {

    static Observers: { [type: string]: Function[] } = {}


    static resetUserObservers() {
        Observer.Observers = {}
    }

    static addObserver(type: string, observer: Function) {

        let thisObserver = Observer.Observers

        if (thisObserver[type] == undefined) {
            thisObserver[type] = []
        }
        thisObserver[type].push(observer)
    }


    static notifyObservers(type: string, msg?: any): void {
        // console.log('in Observables.notifyObserver', msg)

        // observers not set up, set them up
        if (Observer.Observers == undefined) {
            Observer.Observers = {}
        }

        // iterate all observers for that type and fire it's event
        if (type in Observer.Observers) {
            Observer.Observers[type].forEach(event => { event(msg) });
        }
    }
}

