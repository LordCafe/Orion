import React from "react";
import TableInfo  from "./tableInfo"



class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: this.props.api,
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

  handleChange(event) {
    this.setState({ value: event.target.value  });
  }

  handleSubmit(event) {
    this.setState({ status: "loading" });
    MasterApi(this.state.value).then((result) => {
      let { data } = result;
      this.setState({
        status : "complete" ,
        notes : data ,
        current : data[0],
        total: data.length,
        index :0
      });
    })
    event.preventDefault();
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
        template = this.RenderWait();
      break;

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
    return (<div class="block-react">
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
        <ul class="pagination">
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
    return (
      <div className={"body-note"}>
        <div dangerouslySetInnerHTML={{ __html: this.state.current.body }}></div>
      </div>
    );
  }
  render() {

    let pagination = ( this.state.total  > 0 ) ? this.pagination() : false;
    let body =  ( this.state.current['body']   == undefined  ) ? this.loading(): this.RenderBody();
    console.log( body );


    return (

      <div class="row">
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

        <div id="api-response">
        <div id="content">
            <div>
              {pagination}
              <div className={"infotable"}>
                {<TableInfo note={ this.state.current }/>}
              </div>

            </div>

            <div className={"principalNote note-to-show" }>
              { body }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default ShoppingList;
