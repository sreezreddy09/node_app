var React = require("react");
import TopLevelNavContainer from "../topLevelNav/TopLevelNav.container";
var DashboardContainer = require("../dashboardContainer/DashboardContainer.react");
var ProgressBar = require("../progressBar/ProgressBar.react");

var MainDashboard = React.createClass({
    componentWillMount : function(){
        if(this.props.user_profile.user == null){
            this.props.requireAuth();
        }
    },
    render : function (){
        if(this.props.user_profile.user){
            return (
                <div className = "dashboard">
                    <TopLevelNavContainer {...this.props} />
                    <DashboardContainer />
                </div>
            );
        }else{
            return <ProgressBar />
        }
    },

});

module.exports = MainDashboard;