import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise'

import reducers from './reducers';
import PostsIndex from './components/PostsIndex';
import NewPosts from './components/NewPosts';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <div>
              {/*Switch takes the first route that matches with the link*/}
              <Switch>
                  <Route path="/posts/new" component={NewPosts}/>
                  <Route path="/" component={PostsIndex}/> {/*route to '/' needs to go last for matching*/}
                  <Route redirect={PostsIndex}/>
              </Switch>
          </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
