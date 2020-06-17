import React from 'react'
// npm install prop-types  
import PropTypes from 'prop-types'
import moment from 'moment' // npm install moment

class MessageItem extends React.Component {
    constructor(props) { // to copy prop value into the state while creating component
        super(props)
        this.state = { 
            editStatus: false, // state value used to do toggle on the screen
            body: props.body, // to prefill values inside the form
            fullDate: false
        }
    }

    handleRemove = () => {
        const id = this.props.id 
        this.props.removeMessage(id)
    }

    handleEdit = () => { // method responsible for toggle between text and form 
        this.setState((prevState) => {
            return {
                editStatus: !prevState.editStatus
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        const formData = {
            body: this.state.body 
        }
        this.props.updateMessage(this.props.id, formData)

        this.setState((prevState) => {
            return {
                editStatus: !prevState.editStatus
            }
        })
    }

    handleChange = (e) => { 
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    displayButtons = () => {
        return (
            <div>
                <button onClick={this.handleRemove}>remove</button>
                <button onClick={this.handleEdit}>edit</button>
            </div>
        )
    }

    handleFullDate = () => {
        this.setState({
            fullDate: true 
        })
    }

    handleShortDate = () =>{ 
        this.setState( {
            fullDate: false 
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.editStatus ? (
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <textarea 
                                    value={this.state.body}
                                    onChange={this.handleChange}
                                    name="body"
                                ></textarea>
                                <input type="submit" value="update" /> or <button onClick={this.handleEdit}>cancel</button>
                            </form> 
                            
                        </div> 
                    ) : <p> {this.props.body} - 
                    
                     <span onMouseOver={this.handleFullDate} onMouseOut={this.handleShortDate}>
                        {   this.state.fullDate ? moment(this.props.createdAt).format('LLLL') : moment(this.props.createdAt).fromNow() }
                    </span>
                  
                    
                    </p>
                }
                

                {!this.state.editStatus && this.displayButtons()}
            </div>
        )
    }
}

MessageItem.propTypes = {
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}

export default MessageItem