import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import styles from '../../style/Stylesheet';
import { connect } from 'react-redux';
import { createPost } from "../actions/index";


class NewPosts extends Component {
    //pass field by convention; contains event handlers we need to wire up
    renderField(field) {
        const { meta: { touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type="text"
                   {...field.input}
                />
                <div className="text-help">
                    { touched ? error : '' }
                </div>
            </div>
        )
    }
    // reduxForm provides values from form
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

   render(){
        const { handleSubmit } = this.props; //reduxForm provides this for their validation
       return (
           <div>
               <h3 style={styles.margin}>New Post</h3>
               <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                   <Field
                       label="Title"
                       name="title"
                       component={this.renderField}
                       //passing reference to function renderTitleField
                       // so that this field can rerender mult times
                   />
                   <Field
                       label="Tags"
                       name="categories"
                       component={this.renderField}
                   />
                   <Field
                       label="Content"
                       name="content"
                       component={this.renderField}
                   />
                   <button type="submit" className="btn btn-primary">
                       Submit
                   </button>
                   <Link to="/" className="btn btn-danger"
                    style={{marginLeft: '10px'}}
                   >Cancel</Link>
               </form>
           </div>
       )
   }
}

// called automatically, when user hits submit
// pass values by convention
function validate(values) {
    const errors = {};

    //simply put together if statements, and assign prop to error obj

    if(!values.title) {
        errors.title = "Enter a title";
    }
    if(!values.categories) {
        errors.categories = "Enter a category";
    }
    if(!values.content) {
        errors.content = "Enter some content";
    }

    return errors;
}

// pass config options to reduxForm
// reduxForm() allows redux form to communicate directly
// from the component to the reducer
export default reduxForm({
    validate,
    form: 'PostsNewForm'    //unique string for each form
})(
    //this returns a react component (HOC)
   connect(null, { createPost })(NewPosts)
);