// A utility class that assists in getting data from a file for parsing


class FileParser
{
 
    // Require a filename when instanciating
    constructor(fileName)
    {
        this._fileName = fileName;
        
    }

    // Not very handy, but returns the name of the file that was passed
    get getFileName()
    {
        return this._fileName;
    }


    // Allows the user to change the file name 
    set setFileName(fileName)
    {
        this._fileName = fileName;

    }


    // Reads a file line-by-line asynchronously using native dependencies
    // within the Node environment. This ensures that no blocking will
    // occur within the main thread.
    // Consider using regex to allow for more tokens, perhaps in a utility function
    async processLineByLine(token)
    {
        // Dependencies
        const fs = require('fs');
        const readline = require('readline');

        // Readable stream using the path given from the user
        const fileStream = fs.createReadStream(this._fileName);

        // Create a new interface for this instance and listen for incoming data 
        // Using crlfDelay, we can specify how long we want to wait in ms
        // between \r and \n tokens
        const lineStream = readline.createInterface
        ({
            input: fileStream,
            crlfDelay: Infinity
        });

        var count = 0;
        // Wait for the callback and print/do something with the tokenized data
        for await (const line of lineStream)
        {
            if (line != '')
            {
                // Once the process data block is completed, a function
                // within that class should be called here to actually process the data
                console.log("[" + count + "] " + line)
                //console.log(line.split(token));
            }

            count++;
        }
}


}

// Create an instance of the class with a file name
let parser = new FileParser("someOldFileName.txt");
// Print the original file name
console.log("Original file name: " + parser.getFileName);
// Change the file name
parser.setFileName = "data.txt";
// Print the new file name
console.log("New file name: " + parser.getFileName);
// Print each column with it's respective data
parser.processLineByLine(',');
