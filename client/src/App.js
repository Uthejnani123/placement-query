import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar';
import ChatBot from 'react-simple-chatbot';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import SideBar from './components/sideBar';
import TeacherSignup from './components/screens/TeacherSignup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribesUserPosts';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/Newpassword';
import Movies from './components/screens/Movies';
import Orders from './components/screens/Orders';
import Users from './components/screens/Users';
import AdminOrders from './components/screens/Admin/Orders';
import MovieDetail from './components/screens/MovieDetail';
import Dashboard from './components/screens/Dashboard';
import AnnouncementCreate from './components/screens/AnnouncementCreate';
import Announcement from './components/screens/Announcements';
import ResetPassword from './components/screens/ResetPassword';
export const UserContext = createContext();

const steps = [
    {
        id: '0',
        message: 'Welcome to Placement Query!',
        trigger: 'intro-user',
    },
    {
        id: 'intro-user',
        options: [
            { value: 'y', label: 'What is Placement statistics of REC?', trigger: 'yes-response' },
            {
                value: 'n',
                label:
                    'Can you provide a list of companies that have visited our campus for recruitment in the past year?',
                trigger: 'no-response',
            },
            {
                value: 'n1',
                label: 'What is the eligibility criteria for campus placement?',
                trigger: 'no-response1',
            },
            {
                value: 'n2',
                label: 'How can I prepare for campus placements?',
                trigger: 'no-response2',
            },
            {
                value: 'n3',
                label: 'What is the training and development program offered by our college for students?',
                trigger: 'no-response3',
            },
            {
                value: 'n4',
                label: 'Can you provide information about the internship opportunities available for students?',
                trigger: 'no-response4',
            },
            {
                value: 'n5',
                label: 'Can you guide me through the process of registering for campus placement?',
                trigger: 'no-response5',
            },
            {
                value: 'n6',
                label:
                    'How can I stay updated about the latest placement and training opportunities offered by our college?',
                trigger: 'no-response6',
            },
        ],
    },
    {
        id: 'yes-response',
        message: `Around 2058+ students have been placed in the year 2021-2022
For more info click here, https://www.rajalakshmi.org/placement-record-2021-2022.php`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response',
        message: `Super dream offers such as Bounteous, Zoho, LatentView Analytics, Shell have hired people from the
		college. 100+ dream companies including premium companies such as TCS, Virtusa, CTS etc has hired the
		students. You can get the entire list of companies visited the campus for Internship and Placement here
		https://www.rajalakshmi.org/placement-recruiters.php`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response1',
        message: `Most of the companies have an eligibility of more than 75% in 10th, 12th and college with no standing
		arrears. It varies from one organization to another. If you want to get more details on it, add a query on
		the portal to get it clarified.`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response2',
        message: `The basic aptitude training with an ample knowledge on coding would help you to crack the placement
		process with ease. Our college provides the students with the required training to make their
		recruitment process easy.`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response3',
        message: `A winter employability camp and a summer residential program is offered to the pre-final year students
		to make them ready for their placements. The college has seen a significant increase in the number of
		offers and the packages due to the training. In order to know more about the training, visit here
		https://www.rajalakshmi.org/placement-training.php`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response4',
        message: `REC provides with lot of in house training and internship opportunities along with summer internships
		that come along with the pre placement offer. The internship opportunities start from the 5th semester
		of the students.
		https://www.rajalakshmi.org/placement-programs.php
		https://www.rajalakshmi.org/research.php`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response5',
        message: `There is no generic registration required for placements. But with the oncoming of each company, the
		students are required to register for the company’s recruitment process if they are eligible without fail
		as failing to register might not only affect the student but also the institution as a whole.`,
        trigger: 'intro-user',
    },
    {
        id: 'no-response6',
        message: `In order to stay updated with the latest information on placement and training opportuinities, you can
		look into the announcements tab of this portal as all the information are updated as soon as possible
		here.`,
        trigger: 'intro-user',
    },
];

const Routing = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'USER', payload: user });
        } else {
            if (!history.location.pathname.startsWith('/reset')) history.push('/signin');
        }
    }, []);
    return (
        <Switch>
            <Route exact path="/">
                <Profile />
            </Route>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/books">
                <Movies />
            </Route>
            <Route exact path="/admin-ann">
                <AnnouncementCreate />
            </Route>
            <Route exact path="/announcement">
                <Announcement />
            </Route>
            <Route exact path="/queries-unsolved">
                <Movies isUnsolved />
            </Route>
            <Route exact path="/queries-training">
                <Movies isTraining />
            </Route>
            <Route exact path="/queries-training-unsolved">
                <Movies isUnsolved isTraining />
            </Route>
            <Route exact path="/queries-placement">
                <Movies isPlacement />
            </Route>
            <Route exact path="/queries-placement-unsolved">
                <Movies isUnsolved isPlacement />
            </Route>
            <Route exact path="/myquery">
                <Movies isStudentView />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/teacher/signup">
                <TeacherSignup />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/users">
                <Users />
            </Route>
            <Route path="/create">
                <CreatePost />
            </Route>
            <Route path="/top5hostel" component={() => <Orders sortType="hostelAndFood" />}></Route>
            <Route path="/top5transportation" component={() => <Orders sortType="transportation" />}></Route>
            <Route path="/top5jobOpportunities" component={() => <Orders sortType="jobOpportunities" />}></Route>
            <Route path="/top5studentFaculty" component={() => <Orders sortType="studentFaculty" />}></Route>
            <Route path="/top5infrastructure" component={() => <Orders sortType="infrastructure" />}></Route>
            <Route path="/top5sports" component={() => <Orders sortType="sports" />}></Route>
            <Route path="/top5extraCircular" component={() => <Orders sortType="extraCircular" />}></Route>
            <Route path="/admin/book-orders">
                <AdminOrders />
            </Route>
            <Route path="/movies/:productId">
                <MovieDetail />
            </Route>
            <Route path="/profile/:userid">
                <UserProfile />
            </Route>
            <Route path="/myfollowingpost">
                <SubscribedUserPosts />
            </Route>
            <Route exact path="/resetpass">
                <ResetPassword />
            </Route>
            <Route exact path="/reset">
                <Reset />
            </Route>
            <Route path="/reset/:token">
                <NewPassword />
            </Route>
        </Switch>
    );
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log({ state });
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <NavBar />
                {state ? (
                    <>
                        <div style={{ display: 'flex' }}>
                            <SideBar />
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <div style={{ flex: 1 }}>
                                    <Routing />
                                </div>
                                <h5
                                    style={{
                                        margin: 15,
                                    }}>
                                    For More Information contact us via this phone Number - xxxxxxxxxx
                                </h5>
                            </div>
                            <ChatBot steps={steps} floating width="800px" />
                        </div>
                    </>
                ) : (
                    <Routing />
                )}
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
