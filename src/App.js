import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import './css/App.css';
import Feed from './pages/Feed'
import React from "react"
import Search from './pages/Search'
import Ad from './components/Ad';
import {connect} from "react-redux"
import {update, updateProfileImage, userProfile} from "../src/actions/update"
import { Redirect, Route, withRouter } from 'react-router-dom';
import Login  from './components/Login.jsx';

const api = process.env.REACT_APP_BE_URL
const userId = localStorage.getItem("userId")

export let userContext = React.createContext({id: userId})

class App extends React.Component {
  
  getMyProfile = async () => {
    try {
      const res = await fetch(api +"/api/profile/" + userId);
      if (res.ok) {
        const data = await res.json();
        this.props.setProfile(data)
        if(this.props.update) this.props.setUpdate()
        if(this.props.profileImageUpdate) this.props.setProfileUpdate()
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    if(localStorage.getItem('userId')) this.getMyProfile()
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.update !== prevProps.update)this.getMyProfile()
    if(this.props.profileImageUpdate !== prevProps.profileImageUpdate) this.getMyProfile()
  }
	render(){ 
    if(localStorage.getItem('userId')){
    return (
      <>
      <userContext.Provider value={userContext}>
        <MyNavbar	/>
        <Container sm="fluid" style={{marginTop: "8vh"}} className="pt-2" >
          {(this.props.query.length === 0 )&& <Ad title="Need Developers ASAP? Hire the top 3% of 
          developers in 48 hours. $0
            Recruiting fee. Start now."/>}
          <Route render={(routerProps) => <Profile/>} path={["/profile/:id"]}/>
          <Route render={(routerProps) => <Login routerProps={routerProps} />} exact path={"/login"}/>
          <Route render={(routerProps) => <Feed />} exact path={["/feed", "/"]}/>
          <Route render={(routerProps) => <Search />} exact path={["/Search/q=:query","/search/q=:query/:filter"]}/>
        <Footer/>
        </Container>
        </userContext.Provider>
    </>
    );
  }else{
    return (
     <Container sm="fluid" style={{marginTop: "8vh"}} className="pt-2" >
          <MyNavbar	/>
         <Route render={(routerProps) => <Login routerProps={routerProps} />} exact path={"/login"}/>
         <Footer/>
         <Redirect to="/login" />
    </Container>)
  }
  } 
}
const mapDispatchToProps = (dispatch) => ({
  setUpdate: () => dispatch(update()),
  setProfileUpdate: () => dispatch(updateProfileImage()),
  setProfile: (data) => dispatch(userProfile(data))
});

const mapStateToProps = (state) => {return {update: state.update, profileImageUpdate: state.updateProfileImage, query:state.searchWord}};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
