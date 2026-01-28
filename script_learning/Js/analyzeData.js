// option enum for analyzeData
analyzeData.mode = Object.freeze({
    normal: "normal",
    strict: "strict"
});

// debug enum for analyzeData
analyzeData.debug = Object.freeze({
    invalid: {
        input: "Invalid input. (input)",
        option: "Invalid input. (option)"
    }
});

// function
function analyzeData (input, option = {}) {
    // validate inputfs.readFileSync(SCORE_FILE, "utf8") type
    if (!Array.isArray(input)) {
        return analyzeData.debug.invalid.input;
    }
    
    // validate option type
    if (typeof option !== "object" || option === null || Array.isArray(option)) {
        return analyzeData.debug.invalid.option;
    }
    
    // validate option's data
    const min =
        typeof option.min === "number" && !Number.isNaN(option.min)
            ? option.min
            : 0;
    
    const mode =
        option.mode === analyzeData.mode.strict
            ? analyzeData.mode.strict
            : analyzeData.mode.normal;
    
    // reject unknown keys
    for (const key of Object.keys(option)) {
        if (key !== "min" && key !== "mode") {
            return analyzeData.debug.invalid.option;
        }
    }
    
    // data storage
    const data = {
        validCount: 0,
        invalidCount: 0,
        total: 0,
        average: null
    };
    
    // 1oop for storing data
    for (const item of input) {
        if (typeof item !== "number" || Number.isNaN(item)) {
            if (mode === analyzeData.mode.strict) {
                data.invalidCount += 1;
            }
            continue;
        }
    
        if (item >= min) {
            data.validCount += 1;
            data.total += item;
        } else {
            data.invalidCount += 1;
        }
    }
    
    // calculate average
    data.average =
        data.validCount > 0 ? data.total / data.validCount : null;
    
    return data;
}
