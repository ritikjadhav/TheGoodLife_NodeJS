exports.validateEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

exports.validateMobileNo = (value) => {
    return value.length === 10;
}
