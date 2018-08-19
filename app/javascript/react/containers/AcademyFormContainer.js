import React from 'react';
import { browserHistory } from 'react-router';
import DropZone from 'react-dropzone';

import AcademyInput from '../components/AcademyInput'

class AcademyFormContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      file: [],
      errors: {}
    };
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateEntry = this.validateEntry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createAcademy = this.createAcademy.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleChange(event){
    if (event.target.name != "website") {
      this.validateEntry(event.target.name, event.target.value)
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateEntry(name, fieldValue){
    if (fieldValue.trim() === '') {
      let newError = { [name]: `You must enter a ${name}`};
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState[name];
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleSubmit(event){
    event.preventDefault();
    Object.keys(this.state).forEach(key => {
      if (key != "errors" && key != "website" && key != "file") {
        this.validateEntry(key, this.state[key])
      }
    })
    if (Object.keys(this.state.errors).length == 0){
      let newAcademy = new FormData();
      newAcademy.append("name", this.state.name);
      newAcademy.append("address", this.state.address);
      newAcademy.append("city", this.state.city);
      newAcademy.append("state", this.state.state);
      newAcademy.append("zipcode", this.state.zipcode);
      newAcademy.append("website", this.state.website);
      newAcademy.append("academy_photo", this.state.file[0])

      this.createAcademy(newAcademy);
      this.handleClear();
    }
  }

  createAcademy(payload){
   fetch('/api/v1/academies.json', {
     credentials: 'same-origin',
     method: 'POST',
     body: payload
   })
     .then(response => {
       if(response.ok){
         return response
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
             if(response.status == 401){
                alert("Whoa buddy!!\nYou must be signed in to add an academy!!!")
              }
         throw(error)
       }
     })
     .then(response => response.json())
     .then(body => browserHistory.push(`/academies/${body.academy.id}`))
     .catch(error => console.error(`Error in fetch: ${error.message}`));
   }

  handleClear(){
    this.setState({
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      file: [],
      errors: {}
    })
  }

  onDrop(file){
    if(file.length == 1) {
      this.setState({ file: file })
    } else {
      this.setState({ message: 'You can only upload one photo per Academy' })
    }
  }

  render(){
    let errorDiv;

    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form className="grid-container" id="academy-form" onSubmit={this.handleSubmit} >
        <h1 className="user-title">New Academy</h1>
        {errorDiv}
        <AcademyInput
          name="name"
          label="Academy Name"
          handleChange={this.handleChange}
          content={this.state.name}
        />
        <AcademyInput
          name="address"
          label="Street Address"
          handleChange={this.handleChange}
          content={this.state.address}
        />
        <AcademyInput
          name="city"
          label="City"
          handleChange={this.handleChange}
          content={this.state.city}
        />
        <AcademyInput
          name="state"
          label="State"
          handleChange={this.handleChange}
          content={this.state.state}
        />
        <AcademyInput
          name="zipcode"
          label="Zipcode"
          handleChange={this.handleChange}
          content={this.state.zipcode}
        />
        <AcademyInput
          name="website"
          label="Website (optional)"
          handleChange={this.handleChange}
          content={this.state.website}
        />
        <div className="dropzone">
          <DropZone onDrop={this.onDrop} >
            <p id="drop-zone">Academy Logo (upload a square photo to avoid distortion)/ Drag photo here or click to upload file</p>
          </DropZone>
        </div>
        <aside>
          <h2>Dropped Files</h2>
          <ul>
            {
              this.state.file.map(f => <li key={f.name}> {f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      <button id="form-button" type="submit" className="button medium hover-button" value="Submit">Create Academy</button>
      </form>
    )
  }
}

export default AcademyFormContainer
