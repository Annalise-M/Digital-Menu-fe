import React, { useState } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Keyframes, animated } from 'react-spring/renderprops.cjs';
import AuthProvider from '../auth/AuthProvider';
import Home from '../home/Home';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from '../dashboard/dashboard';
import delay from 'delay';
// import IonIcon's 

const items = [
  <>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </AuthProvider>
  </>
]

const Sidebar = Keyframes.Spring({
  peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
  open: { delay: 0, x: 0 },
  close: async call => {
    await delay(400)
    await call({ delay: 0, x: -100 })
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [
    { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
    { x: -100, opacity: 0, delay: 0 },
  ],
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 }
})


export default class App extends React.Component {
  state = { open: undefined }
  toggle = () => this.setState(state => ({ open: !state.open }))
  render() {
    const state =
      this.state.open === undefined
        ? 'peek'
        : this.state.open
        ? 'open'
        : 'close'
    const icon = this.state.open ? 'fold' : 'unfold'
  
  return (
    <div style={{ background: 'lightblue', width: '100%', height: '100%' }}>
        <Icon
          type={`menu-${icon}`}
          className="sidebar-toggle"
          onClick={this.toggle}
        />
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              className="sidebar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
            }}>
            <Content
              native
              items={items}
              keys={items.map((_, i) => i)}
              reverse={!this.state.open}
              state={state}>
              {(item, i) => ({ x, ...props }) => (
                <animated.div
                  style={{
                    transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                    ...props,
                  }}>
                  <Form.Item className={i === 0 ? 'middle' : ''}>
                    {item}
                  </Form.Item>
                </animated.div>
              )}
            </Content>
          </animated.div>
        )}
      </Sidebar>
    </div>
  )
}
}
