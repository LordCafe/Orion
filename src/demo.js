import React from "react";
import TableInfo  from "./tableInfo"



class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.UrlApi = this.props.api;

    this.state = {
        site : 0,
        value: this.props.api.replace("{SITES}",this.props.sites[0]),
        index: 0,
        status : "wait",
        notes : [],
        current :[]
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCurrent = this.changeCurrent.bind(this);
    this.clickPage = this.clickPage.bind(this);
  }

  componentDidMount(){
    setTimeout(()=>{
        this.LoadNotes();
    },500);

  }
  handleChange(event) {
    this.setState({ value: event.target.value  });
  }

  LoadNotes( time = 100 ){
    this.setState({ status: "wait" });

    setTimeout(()=>{
      MasterApi(this.state.value).then((result) => {
        let { data } = result;
        this.setState({
          status: "complete",
          notes: data,
          current: data[0],
          total: data.length,
          index: 0
        });
      })
    },time );

  }
  handleSubmit(event) {
    this.LoadNotes();
    event.preventDefault();
  }


  componentDidUpdate(prevProps , prevState ){

    if( prevState.value != this.state.value){
      console.log("actualizando notas");
      this.LoadNotes(500);
    }else{
      console.log( this.state.status );
    }
  }

  RenderLoading(){
    return (
      <div>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
    );
  }

  RenderWait(){
    return(
      <div> No hay nada que mostrar</div>
    );
  }
  StatusRender(){
    let template = false;
    switch( this.state.status ){
      case  "wait" :
        template =  this.RenderLoading();102/8

      case "loading":

        template = this.RenderLoading();
        break;

      case "complete":
        template = this.RenderComplete();
        break;

      default :
      template = this.RenderWait();

    }
    return template;
  }

  loading() {
    return (<div class="block-react center-content">
      <div class="card-skeleton"></div>
    </div>)
  }
  RenderComplete(){
    let { image } = this.state.current;
    let imageUse = ( Array.isArray( image )) ? image[0].url : image.url;
    return (
      <div class="row">
        <h4>{this.state.current.title }</h4>
        <img class="materialboxed responsive"  src={imageUse}></img>
      </div>
    );

  }
  changeCurrent(event ){
    let index = parseInt(event.target.parentElement.dataset.index);
    this.setState({ current: this.state.notes[index   ] , index : index  });
  }
  pagina( index ){

    let active = ( this.state.index == index  ) ? "active" : "noactive";
    return (<li className={ active } data-index={ index } onClick={
      this.changeCurrent
    }><a href="#!">{ index + 1 }</a></li>);
  }



  clickPage(newIndex ){
    if( this.state.index  >= 0 ){
      let Current = this.state.index + newIndex;
      Current = ( Current < 0 ) ? 0 : Current;
      this.setState({ current: this.state.notes[Current], index: Current });
    }

  }
  pagination(){
    let pag = [];
    let LastActionLi = (this.state.index >= 1) ? "active waves-effect" : "disabled";
    let FirstActionLi = (this.state.index >= this.state.total) ? "active waves-effect" : "disabled";
    for (let index = 0; index < this.state.total; index++) {
      pag.push(this.pagina( index ));
    }


    return(
      <div>
        <ul class="pagination center">
          <li className={ FirstActionLi  } onClick={ ()=>{
            this.clickPage( -1 )
          }}><a href="#!"><i class="material-icons">chevron_left</i></a></li>
          {pag}
          <li className={LastActionLi} onClick={()=>{

            this.clickPage( 1);

          }} ><a

          href="#!"><i

          class="material-icons">chevron_right</i></a></li>
        </ul>
      </div>

    );
  }

  RenderBody(){
    let template= this.loading();
    if( this.state.status === "complete"){
      template = (
        <div className={"body-note"}>
          <div dangerouslySetInnerHTML={{ __html: this.state.current.body }}></div>
        </div>
      );
    }
    return template;

  }

  ButtonSites(){
    let buttons = this.props.sites.map( ( site , index )=>{

      let css = ( this.state.site == index ) ? "red":"";
      return (<a className={"waves-effect waves-light btn button-site " + css } onClick={()=>{
        this.setState( {
          site : index,
          value: this.UrlApi.replace("{SITES}", this.props.sites[index])

        });

      }} >{ site }</a>);
    });
    return buttons;
  }

  RenderExplantion(){
    let template = this.loading();
    if( this.state.status == "complete"){

      template = (
        <div>
          <div className={"infotable"}>
            {<TableInfo note={this.state.current} />}
          </div>
        </div>);
    }


      return template;


  }
  RenderPagination(){
    let pagination = (this.state.total > 0) ? this.pagination() : false;
    return pagination;
  }
  form(){
    return(

      <form class="col s12" onSubmit={this.handleSubmit}>
        <div class="row">
          <div class="input-field cols s6 ">
            <label> Escriba la url del api :</label>
            <input type="text" class="materializa-input" value={this.state.value} onChange={this.handleChange} />
          </div>
          <button class="btn waves-effect waves-light" type="submit" name="action">
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    )
  }
  render() {
    return (
      <div class="row">
        <div>{this.ButtonSites()}</div>
        <h3>{this.state.status}</h3>
        <div >{this.RenderPagination()}</div>
        <div id="api-response">

            <div id="content">
              <div className={"center-content"}>
                  {this.RenderExplantion()}
              </div>
              <div className={"principalNote note-to-show center-content card"}>
                  { this.RenderBody() }
              </div>
            </div>
        </div>
      </div>

    );
  }
}

export default ShoppingList;
