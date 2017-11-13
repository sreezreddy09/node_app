var React = require("react");
var LoginAPI = require("../../api/LoginAPI");

var LoginPage = React.createClass({
    getInitialState : function(){
        return {
            isLogin : true
        };
    },
    render : function(){
        return (
        <div className="page-wrap">
            <div className = "login-page">
                {
                    (this.state.isLogin)?(<div className="signin">
                        <div className="form">
                            <input type = "text" placeholder = "username" ref="username"/>
                            <input type = "password" placeholder = "password" ref="password"/>
                            <button className="submit" onClick={this.validateLogin}> LOGIN </button>
                            <div className = "toggle-logon">
                                <span>Not registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Create an account</span>
                            </div>
                        </div>
                    </div>):(<div className="signin">
                        <div className="form">
                            <input type = "text" placeholder = "Name" ref= "name" />
                            <input type = "text" placeholder = "Username" ref= "username" />
                            <input type = "password" placeholder = "Password" ref= "password" />
                            <input type = "text" placeholder = "Key (*Required)" ref= "key" />
                            <button className="submit" onClick={this.createNewUser}> CREATE </button>
                            <div className = "toggle-logon">
                                <span>Already registered?</span> <span className="toggle" onClick={this.toggleLogOn}>Sign In</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
        );
    },

    toggleLogOn : function(event){
        event.stopPropagation();
        this.state.isLogin = !this.state.isLogin;
        this.setState({});
    },
    validateLogin : function (event){
        event.stopPropagation();
        if(!!this.refs.username.value && !!this.refs.password.value){
            var param = {
                user_name : this.refs.username.value,
                password : this.refs.password.value
            }
            LoginAPI.validateLoginUser(param).done(function(data){
                if(data.length == 1){
                    this.props.history.push('/dashboard');                
                }else if (data.length == 0){
                    console.log("user_name or password didn't match");
                }else{
                    console.log("duplication found");
                }
            }.bind(this)).fail(function(jqXHR, textStatus, errorThrown){
                console.log("************ error thrown", jqXHR, textStatus, errorThrown);
            }.bind(this));
        }
    },

    createNewUser : function(event){
        event.stopPropagation();
        if(!!this.refs.name.value && !!this.refs.username.value && !!this.refs.password.value && !!this.refs.key.value){
            var param = {
                name : this.refs.name.value,
                user_name : this.refs.username.value,
                password : this.refs.password.value,
                key : this.refs.key.value
            };
            LoginAPI.addUserwithLogOn(param).done(function(data){
                this.props.history.push('/dashboard');

            }.bind(this)).fail(function(jqXHR, textStatus, errorThrown){
                console.log("************ error thrown", jqXHR, textStatus, errorThrown);
            }.bind(this));
        }
    }
});

module.exports = LoginPage;