import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
const  upload =async(req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log('fields',fields,'files', files)
            console.log(files.file[0].filepath)
            var oldPath = files.file[0].filepath;
            var newPath = `./public/pics/${files.file[0].originalFilename}`;
            mv(oldPath, newPath, function(err) {
            });
            console.log(newPath)
            const filename=files.file[0].originalFilename
            res.status(200).json({ filename })
            
        })
    })
    
}
export default upload;