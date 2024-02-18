exports.validateEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};

exports.validateMobileNo = (value) => {
    return value.length === 10;
};

exports.validateAppDate = (value) => {
    const availableDates = new Date();
    availableDates.setDate(availableDates.getDate() + 7);

    return value <= availableDates;
};

exports.validateSlot = (value) => {
    let regex = /^(1[0-2]|0?[1-9]) (AM|PM) to (1[0-2]|0?[1-9]) (AM|PM)$/;
    return regex.test(value);
};
