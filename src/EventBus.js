export default class {
    static registrations = {};

    static AddListener(eventName, callback) {
        if (this.registrations[eventName] == undefined) {
            this.registrations[eventName] = {
                handleCount: 0,
                callbacks: []
            };
        }

        this.registrations[eventName].handleCount++;

        let callbackData = {
            handle: this.registrations[eventName].handleCount,
            callback: callback
        };

        this.registrations[eventName].callbacks.push(callbackData);

        let eventBus = this;

        return {
            Remove() {
                eventBus.RemoveListener(eventName, callbackData.handle);
            }
        }
    }

    static RemoveListener(eventName, handle) {
        if (this.registrations[eventName] == undefined) {
            return false;
        }

        this.registrations[eventName].callbacks =
            this.registrations[eventName].callbacks.filter(e => e.handle != handle);

        return true;
    }

    static Invoke(eventName, data) {
        if (this.registrations[eventName] == undefined) {
            return 0;
        }

        let callbacksHandled = 0;

        for (let callbackData of this.registrations[eventName].callbacks) {
            callbackData.callback(data);
            callbacksHandled++;
        }

        return callbacksHandled;
    }
}