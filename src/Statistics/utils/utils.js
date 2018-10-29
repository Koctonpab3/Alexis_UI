
const filteerSuccess = arr => arr.filter(word => word.success >= 3);

const filteerInProcess = arr => arr.filter(word => word.success < 3);

export { filteerSuccess, filteerInProcess };
