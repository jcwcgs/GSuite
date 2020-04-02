function updateUserPhotoFromDrive() {
  
  var domain = [your G Suite domain name]];
  var folderId = [folder id containing all user photos]];
  var fileExtension = [file extension type, eg .jpg, the dot is important];
  
  var dApp = DriveApp;
  var folder = dApp.getFolderById(folderId);
  var filesIter = folder.getFiles();
  
  while(filesIter.hasNext()) {
    
    try {
    
      var file = filesIter.next();
      var userEmail = file.getName().substring(0,file.getName().indexOf(fileExtension)) + '@' + domain;
      
      var blob = file.getBlob();
      var data = Utilities.base64EncodeWebSafe(blob.getBytes());
      
      AdminDirectory.Users.Photos.update({photoData: data}, userEmail);
    
    }
    
    catch(err) { Logger.log(err.toString()); }
    
    
  }
  
}