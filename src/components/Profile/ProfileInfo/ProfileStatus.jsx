import React from "react"
import s from './ProfileInfo.module.css'
// UNUSED COMPONENT FO COMPARE WITH FUNCTIONAL COMPONENT ProfileStatusWithHooks

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    changeEditMode = () => {
         this.setState({editMode: !this.state.editMode})
         this.props.updateMyStatus(this.state.status)

    }
    updateLocalState = (onChange) => {
        this.setState({status: onChange.target.value})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return <div>
            <div>
                {!this.state.editMode && <span onDoubleClick={this.changeEditMode}>{this.props.status || "no status"}</span>}
            </div>
            <div>
                {this.state.editMode && <input onChange={this.updateLocalState} autoFocus={true} onBlur={this.changeEditMode} value={this.state.status}/>}
            </div>
        </div>
    }
}

export default ProfileStatus