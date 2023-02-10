import React, { useState, useLayoutEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Switch, Link, useLocation } from 'react-router-dom';
import MenuHeader from '../MenuHeader';
import ProtectedRoute from '../ProtectedRoute';
import DefaultPage from '../../containers/DefaultPage/Loadable';
import AdvertResponses from '../../containers/AdvertResponses/Loadable';
import AdvertResponsesDetail from '../../containers/AdvertResponses/AdvertResponsesDetail/Loadable';
import RightToWorkHub from '../../containers/RightToWorkHub/Loadable';
import Interview from '../../containers/Interview/Loadable';
import InterviewDetail from '../../containers/Interview/InterviewDetail/Loadable';
import BranchView from '../../containers/BranchCandidates/Loadable';
import InterviewTab from '../../containers/BranchCandidates/InterviewTab';
import EmailTemplates from '../../containers/EmailTemplates/Loadable';
import EditingTemplate from '../../containers/EmailTemplates/EditingTemplate/Loadable';
import ScreeningCall from '../../containers/BranchCandidates/ScreeningCall';
import EscalatedIssues from '../../containers/EscalatedIssues/Loadable';
import EscalatedIssue from '../../containers/EscalatedIssues/EscalatedIssue/EscalatedIssue';
import Branches from '../../containers/Branches/Loadable';
import BranchDetail from '../../containers/Branches/BranchDetail/Loadable';
import Candidates from '../../containers/Candidates/Loadable';
import CLIENT_PATH from '../../constants/clientPath';
import { isAdmin, isConsultant, isCompliance } from '../../utils/userRoles';
import { Sidebar, SidebarDrawer, SidebarDrawerMobile, Content } from './styles';
import Images from '../../assets/images';

const routes = [
  {
    path: CLIENT_PATH.ROOT,
    exact: true,
    main: () => <DefaultPage />,
  },
  {
    path: CLIENT_PATH.ADVERT_RESPONSES,
    exact: true,
    main: () => <AdvertResponses />,
  },
  {
    path: CLIENT_PATH.ADVERT_RESPONSES_ID,
    exact: true,
    main: () => <AdvertResponsesDetail />,
  },
  {
    path: CLIENT_PATH.INTERVIEW,
    exact: true,
    main: () => <Interview />,
  },
  {
    path: CLIENT_PATH.INTERVIEW_ID,
    exact: true,
    main: () => <InterviewDetail />,
  },
  {
    path: CLIENT_PATH.CANDIDATES,
    main: () => <Candidates />,
  },
  {
    path: CLIENT_PATH.CALENDAR,
    main: () => <DefaultPage />,
  },
  {
    path: CLIENT_PATH.RIGHT_TO_WORK_HUB,
    exact: true,
    main: () => <RightToWorkHub />,
  },
  {
    path: CLIENT_PATH.BRANCH_CANDIDATES,
    exact: true,
    main: () => <BranchView />,
  },
  {
    path: CLIENT_PATH.BRANCH_CANDIDATES_INTERVIEW,
    exact: true,
    main: () => <InterviewTab />,
  },
  {
    path: CLIENT_PATH.BRANCH_CANDIDATES_ID,
    exact: true,
    main: () => <ScreeningCall />,
  },
  {
    path: CLIENT_PATH.EMAIL_TEMPLATES,
    exact: true,
    main: () => <EmailTemplates />,
  },
  {
    path: CLIENT_PATH.EMAIL_TEMPLATE,
    exact: true,
    main: () => <EditingTemplate />,
  },
  {
    path: CLIENT_PATH.ESCALATED_ISSUES,
    exact: true,
    main: () => <EscalatedIssues />,
  },
  {
    path: CLIENT_PATH.ESCALATED_ISSUE,
    exact: true,
    main: () => <EscalatedIssue />,
  },
  {
    path: CLIENT_PATH.BRANCHES,
    exact: true,
    main: () => <Branches />,
  },
  {
    path: CLIENT_PATH.BRANCHES_ID,
    exact: true,
    main: () => <BranchDetail />,
  },
];

const advertRespond = {
  icon: <img src={Images.svg_advert_respond} alt="advertRespond" />,
  title: 'Advert responses',
  path: CLIENT_PATH.ADVERT_RESPONSES,
};

const interview = {
  icon: <img src={Images.svg_interview} alt="interview" />,
  title: 'Interview',
  path: CLIENT_PATH.INTERVIEW,
};

const candidates = {
  icon: <img src={Images.svg_candidates} alt="candidates" />,
  title: 'Candidates',
  path: CLIENT_PATH.CANDIDATES,
};

const analytics = {
  icon: <img src={Images.svg_analytics} alt="analytics" />,
  title: 'Analytics',
  path: CLIENT_PATH.ANALYTICS,
};

const rightToWorkHub = {
  icon: <img src={Images.icon_note_text} alt="rightToWorkHub" />,
  title: 'Right To Work Hub',
  path: CLIENT_PATH.RIGHT_TO_WORK_HUB,
};

const branchView = {
  icon: <img src={Images.icon_union} alt="branchView" />,
  title: 'Branch View',
  path: CLIENT_PATH.BRANCH_CANDIDATES,
};

const emailTemplate = {
  icon: <img src={Images.icon_email_white} alt="emailTemplate" />,
  title: 'Email Template',
  path: CLIENT_PATH.EMAIL_TEMPLATES,
};

const escalatedIssue = {
  icon: <img src={Images.icon_flag_filled} alt="logo" />,
  title: 'Escalated issue',
  path: CLIENT_PATH.ESCALATED_ISSUES,
};

const branchManagement = {
  icon: <img src={Images.icon_gear} alt="logo" />,
  title: 'Branch Management',
  path: CLIENT_PATH.BRANCHES,
};

const getMenu = () => {
  const menu = [];
  if (isAdmin()) {
    menu.push(analytics);
    menu.push(branchManagement);
  } else if (isCompliance()) {
    menu.push(rightToWorkHub);
    menu.push(branchView);
    menu.push(escalatedIssue);
    menu.push(emailTemplate);
    menu.push(branchManagement);
  } else if (isConsultant()) {
    menu.push(advertRespond);
    menu.push(interview);
    menu.push(escalatedIssue);
    menu.push(candidates);
  }
  return menu;
};

const DefaultSidebar = () => {
  const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);
  const [isOpenMenuBarMobile, setIsOpenMenuBarMobile] = useState(false);
  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setIsOpenMenuBar(!isOpenMenuBar);
  };

  const handleDrawerToggleMobile = () => {
    setIsOpenMenuBarMobile(!isOpenMenuBarMobile);
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setIsOpenMenuBar(false);
      } else {
        setIsOpenMenuBar(true);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Sidebar>
      <SidebarDrawer
        variant="permanent"
        open={isOpenMenuBar}
        onClose={handleDrawerToggle}
      >
        <Toolbar style={{ padding: '0px' }}>
          {isOpenMenuBar ? (
            <img
              src={Images.svg_logo_white}
              style={{ margin: 'auto' }}
              alt="logo"
              width="180"
            />
          ) : (
            <img
              src={Images.svg_logo_white_mobile}
              style={{ margin: 'auto' }}
              alt="logo"
              width="30"
            />
          )}
        </Toolbar>
        <div className="sidebar_container">
          {getMenu()?.map((item) => (
            <List key={`${item.path}+_menu`}>
              <ListItem
                selected={
                  pathname === item.path ||
                  (item.path && item.path !== '/'
                    ? pathname?.startsWith(item.path)
                    : false)
                }
                button
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText className="menu_title" primary={item.title} />
              </ListItem>
            </List>
          ))}
        </div>
      </SidebarDrawer>
      <SidebarDrawerMobile
        open={isOpenMenuBarMobile}
        onClose={handleDrawerToggleMobile}
      >
        {getMenu()?.map((item) => (
          <List key={`${item.path}+_menu`}>
            <ListItem
              selected={
                pathname === item.path ||
                (item.path && item.path !== '/'
                  ? pathname?.startsWith(item.path)
                  : false)
              }
              onClick={handleDrawerToggleMobile}
              button
              component={Link}
              to={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText className="menu_title" primary={item.title} />
            </ListItem>
          </List>
        ))}
      </SidebarDrawerMobile>
      <Content open={isOpenMenuBar}>
        <MenuHeader
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerToggleMobile={handleDrawerToggleMobile}
        />
        <Switch>
          {routes.map((route) => (
            <ProtectedRoute
              key={`${route.path}_routes`}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </Content>
    </Sidebar>
  );
};

export default DefaultSidebar;
