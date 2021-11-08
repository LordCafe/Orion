import React from "react";
import helpers  from "../helpers";


class TableInfo extends React.Component {
  constructor(props) {
    super(props);
    this.helper = false;
    this.state = {
      status : "loading",
      id : 0,
    };
  }

  loading(){
    return (<div class="block-react">
      <div class="card-skeleton"></div>
    </div>)
  }

  componentDidMount(){

  }

  componentDidUpdate(preprops,prestate  ){
    if (
        this.props.note !== false
        && typeof this.props.note == "object"
        && Object.entries( this.props.note ).length > 0

      ){
        if( this.props.note.id != this.state.id ){
          this.helper = new helpers(this.props.note);
          this.setState({ status: "complete" , id : this.props.note.id  });
        }

      }
  }

  HumanDate(){
    return new Date(this.props.note.created * 1000).toLocaleDateString();
  }

  renderAuthor(){
    let { author = false  } = this.props.note;
    if( author  ){
      let { picture } = author;
      let image = "/images/undraw_profile_pic_ic-5-t.svg";

      if(picture){
        let { thumbnail = image  } = picture;
        image = thumbnail;
      }

      return (<div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src={ image } />
              <span class="card-title">{author.name}</span>
            </div>

            <div class="card-action">
              <a href={author.url}>Ir al profile </a>
            </div>
          </div>
        </div>
      </div>
      )
    }else{
      return this.loading();
    }

  }
  RenderInfo(){
    console.log( this.helper );
    return (
      <div class="card">
        <article>
          <figure className={"photo"}>
            <span></span>
            <a><img src={this.helper.GetPrincipalImage()}></img></a>
            <figcaption>
              <span>
                <span></span>
              </span>
            </figcaption>
          </figure>
          <div>
            <h4 className={"nameAuthor"}><span className={"MayusText"}> { this.helper.GetNote().type } </span></h4>
            <h2 className={"titleNote"}>
              <a href={this.helper.GetUrl()}>{this.helper.GetTitle()}</a>
            </h2>

            <p className={"summaryNote"}>{this.helper.GetSummary()}</p>

            <p className={"nameAuthor date"} >
              <span >
                <span data-testid="todays-date" aria-label="Hace 7 h">{this.helper.GetDate()}</span>
              </span>

              <span > | Por<span  itemprop="name"> {this.helper.GetAuthorInfo().name}</span>
              </span>
              </p>
          </div>
          </article>
          </div>
    );
  }
  StatusRender() {
    let template = false;
    switch (this.state.status) {
      case "wait":
        template = this.loading();
        break;

      case "loading":
        template = this.loading();
        break;

      case "complete":
        template = this.RenderInfo();
        break;

      default:
        template = this.loading();

    }
    return template;
  }

  render() {
   let template = this.StatusRender();
    return ( template );
  }
}

export default TableInfo;
