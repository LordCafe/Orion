class helpers{
  constructor( note ){
    this.note = note;
  }

  GetNote(){
    return this.note;
  }
  GetTitle(){
    return this.note.title;
  }
  GetDate(){
    return  new Date(this.note.created * 1000).toLocaleDateString();
  }

  GetPrincipalImage(){
    let image = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    let imageUse = this.note.images || this.note.image;
    console.log( imageUse ,"principal imagen");
    try {
     image = (Array.isArray(imageUse)) ? imageUse[0].url : imageUse.url;
    } catch (error) {
      console.error( error  );

    }
    return image;
  }
  GetSummary(){
    return this.note.summary;
  }
  GetUrl(){
    return this.note.url;
  }
  GetAuthorInfo(){
    let { author = false } = this.note;
    let image = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    if (author) {
      let { picture } = author;
      if (picture) {
        let { thumbnail = image } = picture;
        image = thumbnail;
      }
    }

    return {
      name : author.name  || "no name ",
      picture : image,

    }
  }
}

export default helpers;
