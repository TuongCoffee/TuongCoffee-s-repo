// enums / constants
const MODE = Object.freeze({
    normal: "normal",
    strict: "strict"
});

const DEBUG = Object.freeze({
    invalid: Object.freeze({
        input: "Invalid input. (input)",
        option: "Invalid input. (option)"
    })
});

// function
function analyzeData(input, option = {}) {
    // validate input type
    if (!Array.isArray(input)) {
        return DEBUG.invalid.input;
    }

    // validate option type
    if (typeof option !== "object" || option === null || Array.isArray(option)) {
        return DEBUG.invalid.option;
    }

    // reject unknown keys
    for (const key of Object.keys(option)) {
        if (key !== "min" && key !== "mode") {
            return DEBUG.invalid.option;
        }
    }

    // validate option.min strictly if provided
    if ("min" in option && (typeof option.min !== "number" || Number.isNaN(option.min))) {
        return DEBUG.invalid.option;
    }

    // normalize options
    const min = option.min;
    const mode =
        option.mode === MODE.strict
            ? MODE.strict
            : MODE.normal;

    // data storage
    const data = {
        validCount: 0,
        invalidCount: 0,
        sum: 0,
        average: null
    };

    // loop
    for (const item of input) {
        // invalid number
        if (typeof item !== "number" || Number.isNaN(item)) {
            if (mode === MODE.strict) {
                data.invalidCount += 1;
            }
            continue;
        }

        // below minimum
        if (min !== undefined && item < min) {
            if (mode === MODE.strict) {
                data.invalidCount += 1;
            }
            continue;
        }

        // valid value
        data.validCount += 1;
        data.sum += item;
    }

    // calculate average
    data.average =
        data.validCount > 0
            ? data.sum / data.validCount
            : null;

    return data;
}

// attach enums
analyzeData.mode = MODE;
analyzeData.debug = DEBUG;

export default analyzeData;
