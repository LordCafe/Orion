import React  from "react";


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.api , apiresponse :"Respuesta api" };
    console.log( this.props );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    console.log( event.target.value);
    this.setState({ value: event.target.value + "?limit=1" });

  }

  handleSubmit(event) {
    console.log( this.state.value );
    MasterApi( this.state.value).then( ( result)=>{
       let { data } = result;
        this.setState({ apiresponse : data[0].body });
    })
    event.preventDefault();
  }

  render() {
    return (

      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value } onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div id="api-response">
          <div dangerouslySetInnerHTML={{ __html: this.state.apiresponse }} />
        </div>

      </div>

    );
  }
}

export default  ShoppingList;
