import React from 'react';
import { browserHistory } from 'react-router';

class AddVideo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      videoId: '',
      errors: {}
    };
    this.validateEntry = this.validateEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addVideo = this.addVideo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addVideo(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/videos.new`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
              if(response.status == 401){
                 alert("Whoa buddy!!\nYou must be signed in to add a video!!!")
               }
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => browserHistory.push(`/academies/${body.academy_id}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event){
    event.preventDefault();
    Object.keys(this.state).forEach(key => {
      if (key != "errors") {
        this.validateEntry(key, this.state[key])
      }
    })
    if (Object.keys(this.state.errors).length == 0){
      let newVideo = {
        videoId: this.state.videoId
      }
      this.addVideo(newVideo);
    }
  }

  render(){

    return(
      <div>
        <form className="grid-container" id="video-form" onSubmit={this.handleSubmit}>
          <h1>Add YouTube Video Id dude </h1>
          <h5>The id is the series of characters after the = sign in the url of the video i.e. (www.youtube.com/watch?v=GqsYDcQl0Xg)</h5>

          <label htmlFor="videoId">YouTube Video Id</label>
          <input type="text" name="videoId" value={this.state.videoId} onChange={this.handleChange}></input>

          <button id="form-button" type="submit" className="button medium hover-button" value="Submit">
            Add Video
          </button>
        </form>
      </div>
    )
  }
}

export default AddVideo;
