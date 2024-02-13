exports.validateName = (name) => {
    return name.trim().length < 3 || name.trim().length > 50;
}