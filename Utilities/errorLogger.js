const fs = require('fs');

errorLogger = (err, req, res, next) => {
    if (err) {
        //Maintain a file ErrorLogger.txt which will keep the track of all the errors
        fs.appendFile('ErrorLogger.txt', `Error: ${new Date().toString()} - ${err.message}\n`,
            (error) => {
                //If the error logging fails then mention this in console
                if (error) {
                    console.log('Logging failed.');
                }
            });
        if (err.status) {
            res.status(err.status);
        } else {
            res.status(500);
        }

        res.json({
            status: 'error',
            message: err.message,
        })
    }
    next();
}

module.exports = errorLogger;