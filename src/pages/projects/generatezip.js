import JSZip from  'jszip';
import { saveAs } from 'file-saver';

const generateZip = () => {
var zip = new JSZip();
 
zip.file("Hello.txt", "Hello World\n");

var img = zip.folder("images");

zip.generateAsync({type:"blob"}).then(function(content) {
    saveAs(content, "example.zip");
});
}

 const generateZipFromCloud = () => { 
  let filename = "MultiFilesDownload";
  const urls = [
        'https://firebasestorage.googleapis.com/v0/b/modsimadmin-ce9c3.appspot.com/o/images%2F1602737283946.jpg?alt=media&token=611eb1cc-27a1-4a8e-b9d3-c68e4d35ed77',
        'https://firebasestorage.googleapis.com/v0/b/modsimadmin-ce9c3.appspot.com/o/images%2F1602737283946.jpg?alt=media&token=611eb1cc-27a1-4a8e-b9d3-c68e4d35ed77',
        
    ]
    const zip = new JSZip()
    const folder = zip.folder('project')
    urls.forEach((url)=> {
    const blobPromise =  fetch(url)    
    .then(function (response) {  
     console.log({response})             
     if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response.blob());
    } else {
        return Promise.reject(new Error(response.statusText));
    }
   })                          
   const name = url.substring(url.lastIndexOf('/'))
        folder.file(name, blobPromise)
    })

    zip.generateAsync({type:"blob"})
        .then(blob => saveAs(blob, filename))
        .catch(e => console.log(e));
}

export default generateZipFromCloud