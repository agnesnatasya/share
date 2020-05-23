class PrivateRoute = ({ component: Component, ...rest }) => (
  
    <Route {...rest} render={(props) => (
      this.props.match.params.userId == props.userId
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  