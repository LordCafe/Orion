function MasterApi(url){
  return fetch(url)
    .then(response => response.json())

}
