/**
 * Create delay,
 * @param {*} delay 
 * @returns delayedFunc
 */
export const CreateDelayer = (delay=300) => {
    //local variables
    let oldTimer = -1;
    let state = 0;

    //the return value is a function enabling a delayed call
    return (delayedFunc) => {
        //cancellation of the old timer
        if (state !== 0) {
            clearTimeout(oldTimer)
            oldTimer = -1;
            state = 0;
        }

        //wrapping the function, when called it is noted that it was called
        const encapsulatedFunc = () => {
            oldTimer = -1;
            state = 0;
            return delayedFunc(); // usually delayedFunc() returns a Promise, so .then, .catch and .finally can be used
        }

        //we expect a delayed function call
        state = 1;

        //definition of a new timer
        oldTimer = setTimeout(encapsulatedFunc, delay);
    }
}